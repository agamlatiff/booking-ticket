import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
import {
  successResponse,
  validationError,
  notFound,
  conflict,
  internalError,
  formatZodErrors,
} from "@/lib/api/response";
import { withDoctor } from "@/lib/api/middleware";
import { doctorBookingSchema } from "@/lib/validations";
import { sendWhatsApp, formatBookingConfirmation } from "@/lib/whatsapp";

// ============================================
// POST /api/doctor/bookings - Create booking (skip payment)
// ============================================

export const POST = withDoctor(async (request, { session }) => {
  try {
    const body = await request.json();

    // Validate input
    const parsed = doctorBookingSchema.safeParse(body);
    if (!parsed.success) {
      return validationError("Data tidak valid", formatZodErrors(parsed.error));
    }

    const { patientId, newPatient, serviceId, slotId, bookingType, notes } =
      parsed.data;

    // Get doctor profile
    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      select: { id: true, name: true },
    });

    if (!doctor) {
      return notFound("Profil dokter");
    }

    // Get service
    const service = await prisma.service.findUnique({
      where: { id: serviceId, isActive: true },
    });

    if (!service) {
      return notFound("Layanan");
    }

    // Generate booking code
    const bookingCode = `DENT-${nanoid(6).toUpperCase()}`;

    // Create booking in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Check slot availability
      const slot = await tx.timeSlot.findUnique({
        where: { id: slotId },
      });

      if (!slot) {
        throw new Error("SLOT_NOT_FOUND");
      }

      if (!slot.isAvailable) {
        throw new Error("SLOT_UNAVAILABLE");
      }

      // Verify slot belongs to this doctor
      if (slot.doctorId !== doctor.id) {
        throw new Error("SLOT_DOCTOR_MISMATCH");
      }

      // Create or get patient
      let finalPatientId = patientId;
      let patientData: { name: string; phone: string };

      if (newPatient) {
        // Create new patient
        const createdPatient = await tx.user.create({
          data: {
            name: newPatient.name,
            phone: newPatient.phone,
            email: newPatient.email || `patient_${Date.now()}@placeholder.local`,
            address: newPatient.address,
            role: "PATIENT",
          },
        });
        finalPatientId = createdPatient.id;
        patientData = { name: createdPatient.name!, phone: createdPatient.phone! };
      } else {
        // Get existing patient
        const patient = await tx.user.findUnique({
          where: { id: patientId },
          select: { name: true, phone: true },
        });

        if (!patient) {
          throw new Error("PATIENT_NOT_FOUND");
        }

        patientData = { name: patient.name!, phone: patient.phone || "" };
      }

      // Mark slot as unavailable
      await tx.timeSlot.update({
        where: { id: slotId },
        data: { isAvailable: false },
      });

      // Create booking with CONFIRMED status (skip payment)
      const booking = await tx.booking.create({
        data: {
          code: bookingCode,
          patientId: finalPatientId!,
          patientName: patientData.name,
          patientPhone: patientData.phone,
          doctorId: doctor.id,
          serviceId,
          slotId,
          appointmentDate: slot.date,
          appointmentTime: slot.startTime,
          dpAmount: service.dpAmount,
          dpPaid: 0, // Paid offline
          totalPrice: service.price,
          status: "PAID", // Skip PENDING, treat as paid (offline payment)
          notes,
          bookingSource: "DOCTOR_PORTAL",
          bookingType,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Dummy
        },
        include: {
          service: { select: { name: true } },
        },
      });

      return { booking, patientData };
    });

    // Send WhatsApp confirmation (async, don't block)
    if (result.patientData.phone) {
      sendWhatsApp({
        to: result.patientData.phone,
        message: formatBookingConfirmation({
          code: result.booking.code,
          patientName: result.patientData.name,
          serviceName: result.booking.service.name,
          doctorName: doctor.name,
          appointmentDate: result.booking.appointmentDate,
          appointmentTime: result.booking.appointmentTime,
          dpAmount: result.booking.dpAmount,
          totalPrice: result.booking.totalPrice,
        }),
      }).catch((err) => {
        console.error("WhatsApp notification failed:", err);
      });
    }

    return successResponse(
      {
        bookingId: result.booking.id,
        code: result.booking.code,
        patientName: result.patientData.name,
        service: result.booking.service.name,
        appointmentDate: result.booking.appointmentDate,
        appointmentTime: result.booking.appointmentTime,
        status: result.booking.status,
      },
      "Booking berhasil dibuat",
      201
    );
  } catch (error) {
    console.error("Error creating doctor booking:", error);

    if (error instanceof Error) {
      if (error.message === "SLOT_NOT_FOUND") {
        return notFound("Slot waktu");
      }
      if (error.message === "SLOT_UNAVAILABLE") {
        return conflict("Slot sudah tidak tersedia");
      }
      if (error.message === "SLOT_DOCTOR_MISMATCH") {
        return validationError("Slot tidak sesuai dengan profil dokter Anda");
      }
      if (error.message === "PATIENT_NOT_FOUND") {
        return notFound("Pasien");
      }
    }

    return internalError("Gagal membuat booking");
  }
});
