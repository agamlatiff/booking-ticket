import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import {
  successResponse,
  validationError,
  internalError,
  formatZodErrors,
} from "@/lib/api/response";

// ============================================
// POST /api/contact - Submit contact form
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return validationError("Data tidak valid", formatZodErrors(parsed.error));
    }

    const { name, email, subject, message } = parsed.data;

    // Sanitize message to prevent XSS (basic sanitization)
    const sanitizedMessage = message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");

    // Save to database
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message: sanitizedMessage,
      },
    });

    // TODO: Send email notification to admin
    // await sendAdminNotification({ name, email, subject, message });

    return successResponse(
      { submitted: true },
      "Pesan berhasil terkirim! Kami akan menghubungi Anda segera."
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return internalError("Gagal mengirim pesan");
  }
}
