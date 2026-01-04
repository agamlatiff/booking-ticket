import { NextResponse } from "next/server";

// ============================================
// API RESPONSE HELPERS
// ============================================

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// ============================================
// ERROR CODES
// ============================================

export const ErrorCodes = {
  // Authentication
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  SESSION_EXPIRED: "SESSION_EXPIRED",

  // Validation
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",

  // Resources
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  CONFLICT: "CONFLICT",

  // Booking specific
  SLOT_UNAVAILABLE: "SLOT_UNAVAILABLE",
  BOOKING_EXPIRED: "BOOKING_EXPIRED",
  CANNOT_CANCEL: "CANNOT_CANCEL",
  CANCELLATION_TOO_LATE: "CANCELLATION_TOO_LATE",

  // Payment
  PAYMENT_FAILED: "PAYMENT_FAILED",
  INVALID_SIGNATURE: "INVALID_SIGNATURE",

  // Rate limiting
  RATE_LIMITED: "RATE_LIMITED",

  // Server
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

// ============================================
// RESPONSE HELPERS
// ============================================

/**
 * Create a success response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true as const,
      data,
      ...(message && { message }),
    },
    { status }
  );
}

/**
 * Create an error response
 */
export function errorResponse(
  code: ErrorCode,
  message: string,
  status: number,
  details?: Record<string, string[]>
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false as const,
      error: {
        code,
        message,
        ...(details && { details }),
      },
    },
    { status }
  );
}

// ============================================
// COMMON ERROR RESPONSES
// ============================================

export function unauthorized(message: string = "Silakan login terlebih dahulu") {
  return errorResponse(ErrorCodes.UNAUTHORIZED, message, 401);
}

export function forbidden(message: string = "Anda tidak memiliki akses") {
  return errorResponse(ErrorCodes.FORBIDDEN, message, 403);
}

export function notFound(resource: string = "Resource") {
  return errorResponse(ErrorCodes.NOT_FOUND, `${resource} tidak ditemukan`, 404);
}

export function validationError(
  message: string = "Data tidak valid",
  details?: Record<string, string[]>
) {
  return errorResponse(ErrorCodes.VALIDATION_ERROR, message, 400, details);
}

export function conflict(message: string) {
  return errorResponse(ErrorCodes.CONFLICT, message, 409);
}

export function tooManyRequests(message: string = "Terlalu banyak permintaan") {
  return errorResponse(ErrorCodes.RATE_LIMITED, message, 429);
}

export function internalError(message: string = "Terjadi kesalahan server") {
  return errorResponse(ErrorCodes.INTERNAL_ERROR, message, 500);
}

/**
 * Helper to extract validation errors from Zod
 */
export function formatZodErrors(
  zodError: { flatten(): { fieldErrors: Record<string, string[]> } }
): Record<string, string[]> {
  return zodError.flatten().fieldErrors;
}
