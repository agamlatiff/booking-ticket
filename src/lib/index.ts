/**
 * Library exports index
 * Central export point for all lib modules
 * @module lib
 */

// API utilities
export * from "./api/response";
export * from "./api/middleware";

// Authentication
export { auth, signIn, signOut, handlers, hashPassword, verifyPassword } from "./auth";

// Data fetching
export { getHomepageServices, getHomepageDoctors, formatPrice } from "./homepage-data";
export { getClinicSettings, formatAddress, getWhatsAppLink, getMapsLink, getPhoneLink, getEmailLink } from "./clinic-data";

// Utilities
export { logger } from "./logger";
export * from "./pagination";
export * from "./rate-limit";
export * from "./sanitize";

// Constants
export * from "./constants";

