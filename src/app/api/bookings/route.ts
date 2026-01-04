import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
import { createBookingSchema, bookingFilterSchema } from "@/lib/validations";
import {
  successResponse,
  validationError,
  notFound,
  conflict,
  internalError,
  formatZodErrors,
  tooManyRequests,
} from "@/lib/api/response";
import { withAuth } from "@/lib/api/middleware";
import { createSnapTransaction } from "@/lib/midtrans";
import { checkRateLimit, getClientIP, RATE_LIMITS } from "@/lib/rate-limit";

// ============================================
// POST /api/bookings - Create new booking
// ============================================

export const POST = withAuth(async (request, { session }) => {
  try {
    // Rate limiting - 5 requests per minute per IP
    const clientIP = getClientIP(request.headers);
    const rateLimit = checkRateLimit(`booking:${clientIP}`, RATE_LIMITS.booking);

    if (!rateLimit.success) {
      return tooManyRequests(
        `Terlalu banyak permintaan. Coba lagi dalam ${Math.ceil((rateLimit.resetAt.getTime() - Date.now()) / 1000)} detik.`
      );
    }

    const body = await request.json();

    // Validate input
    const parsed = createBookingSchema.safeParse(body);
    if (!parsed.success) {
      return validationError("Data tidak valid", formatZodErrors(parsed.error));
    }

    const { serviceId, doctorId, slotId, patientName, patientPhone, notes } =
      parsed.data;

    // Get service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId, isActive: true },
    });

    if (!service) {
      return notFound("Layanan");
    }

    // Verify doctor exists and is active
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId, isActive: true },
    });

    if (!doctor) {
      return notFound("Dokter");
    }

    // Generate booking code
    const bookingCode = `DENT-${nanoid(6).toUpperCase()}`;

    // Set expiry time (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Create booking in transaction with proper locking
    const result = await prisma.$transaction(async (tx) => {
      // Check slot availability with lock
      const slot = await tx.timeSlot.findUnique({
        where: { id: slotId },
      });

      if (!slot) {
        throw new Error("SLOT_NOT_FOUND");
      }

      if (!slot.isAvailable) {
        throw new Error("SLOT_UNAVAILABLE");
      }

      // Verify slot belongs to the selected doctor
      if (slot.doctorId !== doctorId) {
        throw new Error("SLOT_DOCTOR_MISMATCH");
      }

      // Mark slot as unavailable
      await tx.timeSlot.update({
        where: { id: slotId },
        data: { isAvailable: false },
      });

      // Create booking
      const booking = await tx.booking.create({
        data: {
          code: bookingCode,
          patientId: session.user.id,
          patientName,
          patientPhone,
          doctorId,
          serviceId,
          slotId,
          appointmentDate: slot.date,
          appointmentTime: slot.startTime,
          dpAmount: service.dpAmount,
          totalPrice: service.price,
          notes,
          expiresAt,
          status: "PENDING",
          bookingSource: "PATIENT_ONLINE",
        },
        include: {
          service: { select: { name: true, price: true } },
          doctor: { select: { name: true } },
        },
      });

      return booking;
    });

    // Generate Midtrans payment token
    let paymentToken: string | null = null;
    let paymentRedirectUrl: string | null = null;

    try {
      const midtransResponse = await createSnapTransaction({
        orderId: result.code,
        grossAmount: result.dpAmount,
        customerDetails: {
          firstName: patientName,
          email: session.user.email,
          phone: patientPhone,
        },
        itemDetails: [
          {
            id: result.serviceId,
            name: `DP - ${result.service.name}`,
            price: result.dpAmount,
            quantity: 1,
          },
        ],
      });

      paymentToken = midtransResponse.token;
      paymentRedirectUrl = midtransResponse.redirect_url;

      // Update booking with token
      await prisma.booking.update({
        where: { id: result.id },
        data: { tokenMidtrans: paymentToken },
      });
    } catch (midtransError) {
      console.error("Midtrans token generation failed:", midtransError);
      // Continue without payment token - admin can handle manually
    }

    return successResponse(
      {
        bookingId: result.id,
        code: result.code,
        service: result.service.name,
        doctor: result.doctor.name,
        appointmentDate: result.appointmentDate,
        appointmentTime: result.appointmentTime,
        dpAmount: result.dpAmount,
        totalPrice: result.totalPrice,
        expiresAt: result.expiresAt,
        paymentToken,
        paymentRedirectUrl,
      },
      "Booking berhasil dibuat",
      201
    );
  } catch (error) {
    console.error("Error creating booking:", error);

    if (error instanceof Error) {
      if (error.message === "SLOT_NOT_FOUND") {
        return notFound("Slot waktu");
      }
      if (error.message === "SLOT_UNAVAILABLE") {
        return conflict("Maaf, slot sudah tidak tersedia. Silakan pilih slot lain.");
      }
      if (error.message === "SLOT_DOCTOR_MISMATCH") {
        return validationError("Slot tidak sesuai dengan dokter yang dipilih");
      }
    }

    return internalError("Gagal membuat booking");
  }
});

// ============================================
// GET /api/bookings - Get user's bookings
// ============================================

export const GET = withAuth(async (request, { session }) => {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query params
    const parsed = bookingFilterSchema.safeParse({
      status: searchParams.get("status"),
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "20",
    });

    if (!parsed.success) {
      return validationError("Parameter tidak valid", formatZodErrors(parsed.error));
    }

    const { status, page, limit } = parsed.data;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {
      patientId: session.user.id,
    };

    if (status) {
      where.status = status;
    }

    // Get total count
    const total = await prisma.booking.count({ where });

    // Get bookings
    const bookings = await prisma.booking.findMany({
      where,
      include: {
        service: { select: { name: true, slug: true } },
        doctor: { select: { name: true, speciality: true, image: true } },
      },
      orderBy: { appointmentDate: "desc" },
      skip,
      take: limit,
    });

    return successResponse({
      bookings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return internalError("Gagal mengambil data booking");
  }
});
