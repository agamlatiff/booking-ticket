// ============================================
// RATE LIMITER
// Simple in-memory rate limiting for API routes
// ============================================

interface RateLimitStore {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitStore>();

// Clean up old entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of store.entries()) {
      if (value.resetAt < now) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: Date;
}

/**
 * Check rate limit for a given identifier (usually IP or userId)
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = `${identifier}`;
  const windowMs = config.windowSeconds * 1000;

  let entry = store.get(key);

  // If no entry or window expired, create new one
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 0,
      resetAt: now + windowMs,
    };
    store.set(key, entry);
  }

  // Increment count
  entry.count++;

  const remaining = Math.max(0, config.limit - entry.count);
  const success = entry.count <= config.limit;

  return {
    success,
    remaining,
    resetAt: new Date(entry.resetAt),
  };
}

/**
 * Get client IP from request headers
 */
export function getClientIP(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return headers.get("x-real-ip") || "unknown";
}

// Preset configurations for common use cases
export const RATE_LIMITS = {
  // Booking: 5 requests per minute per IP
  booking: { limit: 5, windowSeconds: 60 },
  // Contact form: 3 requests per minute per IP
  contact: { limit: 3, windowSeconds: 60 },
  // Auth: 10 requests per minute per IP
  auth: { limit: 10, windowSeconds: 60 },
  // General API: 60 requests per minute per IP
  api: { limit: 60, windowSeconds: 60 },
} as const;
