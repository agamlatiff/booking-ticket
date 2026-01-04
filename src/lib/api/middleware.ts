import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { unauthorized, forbidden } from "./response";
import { RoleUser } from "@prisma/client";

// ============================================
// AUTH MIDDLEWARE HELPERS
// ============================================

type RouteHandler = (
  request: NextRequest,
  context: { params?: Promise<Record<string, string>> }
) => Promise<NextResponse>;

type AuthenticatedRouteHandler = (
  request: NextRequest,
  context: {
    params?: Promise<Record<string, string>>;
    session: {
      user: {
        id: string;
        email: string;
        name?: string | null;
        role: RoleUser;
        phone?: string | null;
      };
    };
  }
) => Promise<NextResponse>;

/**
 * Wrapper to protect routes that require authentication
 */
export function withAuth(handler: AuthenticatedRouteHandler): RouteHandler {
  return async (request, context) => {
    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized();
    }

    return handler(request, {
      ...context,
      session: {
        user: {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.name,
          role: session.user.role as RoleUser,
          phone: session.user.phone,
        },
      },
    });
  };
}

/**
 * Wrapper to protect routes that require specific roles
 */
export function withRole(
  roles: RoleUser | RoleUser[],
  handler: AuthenticatedRouteHandler
): RouteHandler {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return async (request, context) => {
    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized();
    }

    const userRole = session.user.role as RoleUser;
    if (!allowedRoles.includes(userRole)) {
      return forbidden(`Hanya ${allowedRoles.join(" atau ")} yang dapat mengakses`);
    }

    return handler(request, {
      ...context,
      session: {
        user: {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.name,
          role: userRole,
          phone: session.user.phone,
        },
      },
    });
  };
}

/**
 * Wrapper specifically for admin routes
 */
export function withAdmin(handler: AuthenticatedRouteHandler): RouteHandler {
  return withRole("ADMIN", handler);
}

/**
 * Wrapper specifically for doctor routes
 */
export function withDoctor(handler: AuthenticatedRouteHandler): RouteHandler {
  return withRole("DOCTOR", handler);
}

/**
 * Wrapper for patient routes
 */
export function withPatient(handler: AuthenticatedRouteHandler): RouteHandler {
  return withRole("PATIENT", handler);
}

// ============================================
// CRON JOB PROTECTION
// ============================================

type CronHandler = (request: NextRequest) => Promise<NextResponse>;

/**
 * Wrapper to protect cron job routes with CRON_SECRET
 */
export function withCronAuth(handler: CronHandler): CronHandler {
  return async (request) => {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      console.error("CRON_SECRET not configured");
      return NextResponse.json(
        { error: "Cron secret not configured" },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(request);
  };
}
