/**
 * Clinic Settings Data Fetcher
 * Fetches clinic information from database with caching
 * @module lib/clinic-data
 */

import prisma from "@/lib/prisma";
import { cache } from "react";

/**
 * Clinic settings interface
 */
export interface ClinicSettings {
  clinicName: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsappNumber: string | null;
  operationalHours: OperationalHours | null;
}

/**
 * Operational hours by day
 */
export interface OperationalHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

/**
 * Default clinic settings (fallback)
 */
const DEFAULT_SETTINGS: ClinicSettings = {
  clinicName: "Klinik Gigi Senyum Sejahtera",
  address: "Jl. Kesehatan No. 123, Jakarta Selatan 12345",
  phone: "(021) 7890-1234",
  email: "info@senyumsejahtera.com",
  whatsappNumber: "6281234567890",
  operationalHours: {
    monday: "09:00 - 21:00",
    tuesday: "09:00 - 21:00",
    wednesday: "09:00 - 21:00",
    thursday: "09:00 - 21:00",
    friday: "09:00 - 21:00",
    saturday: "09:00 - 17:00",
    sunday: "Tutup",
  },
};

/**
 * Fetch clinic settings from database (cached)
 * Falls back to default settings if database is unavailable
 * @returns ClinicSettings object
 * @example
 * const settings = await getClinicSettings();
 * console.log(settings.clinicName); // "Klinik Gigi Senyum Sejahtera"
 */
export const getClinicSettings = cache(async (): Promise<ClinicSettings> => {
  try {
    const settings = await prisma.clinicSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      return DEFAULT_SETTINGS;
    }

    // Parse operationalHours JSON
    let operationalHours: OperationalHours | null = null;
    if (settings.operationalHours) {
      try {
        operationalHours = JSON.parse(settings.operationalHours);
      } catch {
        operationalHours = null;
      }
    }

    return {
      clinicName: settings.clinicName,
      address: settings.address,
      phone: settings.phone,
      email: settings.email,
      whatsappNumber: settings.whatsappNumber,
      operationalHours,
    };
  } catch (error) {
    console.error("Failed to fetch clinic settings:", error);
    return DEFAULT_SETTINGS;
  }
});

/**
 * Get full address for display
 */
export function formatAddress(settings: ClinicSettings): string {
  return settings.address || DEFAULT_SETTINGS.address!;
}

/**
 * Get WhatsApp link
 */
export function getWhatsAppLink(settings: ClinicSettings, message?: string): string {
  const number = settings.whatsappNumber || DEFAULT_SETTINGS.whatsappNumber;
  const baseUrl = `https://wa.me/${number}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

/**
 * Get Google Maps link for address
 */
export function getMapsLink(settings: ClinicSettings): string {
  const address = settings.address || DEFAULT_SETTINGS.address;
  return `https://maps.google.com/?q=${encodeURIComponent(address!)}`;
}

/**
 * Format phone for tel: link
 */
export function getPhoneLink(settings: ClinicSettings): string {
  const phone = settings.phone || DEFAULT_SETTINGS.phone;
  // Remove non-numeric characters except leading +
  const cleaned = phone!.replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}

/**
 * Get email mailto link
 */
export function getEmailLink(settings: ClinicSettings, subject?: string): string {
  const email = settings.email || DEFAULT_SETTINGS.email;
  const baseUrl = `mailto:${email}`;
  return subject ? `${baseUrl}?subject=${encodeURIComponent(subject)}` : baseUrl;
}
