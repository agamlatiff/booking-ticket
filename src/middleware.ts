import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;
  const pathname = nextUrl.pathname;

  // Protect admin routes
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // Protect doctor routes
  if (pathname.startsWith("/doctor")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }
    if (role !== "DOCTOR") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // Protect patient routes (my-bookings, checkout - NOT booking, let them browse first)
  const patientProtectedRoutes = ["/my-bookings", "/checkout"];
  if (patientProtectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isLoggedIn) {
      const signInUrl = new URL("/sign-in", nextUrl);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Redirect logged-in users away from auth pages
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    if (isLoggedIn) {
      // Redirect based on role
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }
      if (role === "DOCTOR") {
        return NextResponse.redirect(new URL("/doctor", nextUrl));
      }
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/doctor/:path*",
    "/my-bookings/:path*",
    "/checkout/:path*",
    "/sign-in",
    "/sign-up",
    "/complete-profile",
  ],
};
