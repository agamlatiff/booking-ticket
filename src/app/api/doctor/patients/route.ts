import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  validationError,
  notFound,
  internalError,
  formatZodErrors,
} from "@/lib/api/response";
import { withDoctor } from "@/lib/api/middleware";
import { newPatientSchema } from "@/lib/validations";
import { z } from "zod";

const querySchema = z.object({
  search: z.string().max(100).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

// ============================================
// GET /api/doctor/patients - Doctor's patients
// ============================================

export const GET = withDoctor(async (request, { session }) => {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = querySchema.safeParse({
      search: searchParams.get("search"),
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "20",
    });

    if (!parsed.success) {
      return validationError("Parameter tidak valid", formatZodErrors(parsed.error));
    }

    const { search, page, limit } = parsed.data;
    const skip = (page - 1) * limit;

    // Get doctor profile
    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!doctor) {
      return notFound("Profil dokter");
    }

    // Get unique patient IDs from bookings
    const patientBookings = await prisma.booking.groupBy({
      by: ["patientId"],
      where: {
        doctorId: doctor.id,
        status: { in: ["COMPLETED", "CHECKED_IN", "PAID"] },
      },
      _count: { id: true },
      _max: { appointmentDate: true },
    });

    const patientIds = patientBookings.map((b) => b.patientId);

    // Build search filter
    const searchFilter = search
      ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
      : {};

    // Get patients with search
    const [patients, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          id: { in: patientIds },
          ...searchFilter,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true,
          createdAt: true,
        },
        skip,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.user.count({
        where: {
          id: { in: patientIds },
          ...searchFilter,
        },
      }),
    ]);

    // Enrich with booking stats
    const patientsWithStats = patients.map((patient) => {
      const stats = patientBookings.find((b) => b.patientId === patient.id);
      return {
        ...patient,
        bookingCount: stats?._count.id || 0,
        lastVisit: stats?._max.appointmentDate || null,
      };
    });

    return successResponse({
      patients: patientsWithStats,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching doctor patients:", error);
    return internalError("Gagal mengambil data pasien");
  }
});

// ============================================
// POST /api/doctor/patients - Create new patient
// ============================================

export const POST = withDoctor(async (request, { session }) => {
  try {
    const body = await request.json();

    // Validate input
    const parsed = newPatientSchema.safeParse(body);
    if (!parsed.success) {
      return validationError("Data tidak valid", formatZodErrors(parsed.error));
    }

    const { name, phone, email, address } = parsed.data;

    // Check if email already exists (if provided)
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return validationError("Email sudah terdaftar");
      }
    }

    // Create new patient user
    const patient = await prisma.user.create({
      data: {
        name,
        phone,
        email: email || `patient_${Date.now()}@placeholder.local`,
        address,
        role: "PATIENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        createdAt: true,
      },
    });

    return successResponse(patient, "Pasien berhasil ditambahkan", 201);
  } catch (error) {
    console.error("Error creating patient:", error);
    return internalError("Gagal menambahkan pasien");
  }
});
