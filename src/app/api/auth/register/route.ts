import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { registerSchema } from "@/lib/validations/auth";
import {
  successResponse,
  validationError,
  conflict,
  internalError,
  formatZodErrors,
} from "@/lib/api/response";
import { checkRateLimit, getClientIP, RATE_LIMITS } from "@/lib/rate-limit";

// ============================================
// POST /api/auth/register - Register new user
// ============================================

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 10 requests per minute per IP
    const clientIP = getClientIP(request.headers);
    const rateLimit = checkRateLimit(`register:${clientIP}`, RATE_LIMITS.auth);

    if (!rateLimit.success) {
      return validationError(
        `Terlalu banyak permintaan. Coba lagi dalam ${Math.ceil((rateLimit.resetAt.getTime() - Date.now()) / 1000)} detik.`
      );
    }

    const body = await request.json();

    // Validate input with Zod
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return validationError("Data tidak valid", formatZodErrors(parsed.error));
    }

    const { name, email, password } = parsed.data;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return conflict("Email sudah terdaftar. Silakan gunakan email lain atau login.");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "PATIENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return successResponse(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      "Registrasi berhasil! Silakan login.",
      201
    );
  } catch (error) {
    console.error("Register error:", error);
    return internalError("Gagal mendaftar. Silakan coba lagi.");
  }
}
