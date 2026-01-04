// ============================================
// HOMEPAGE DATA FETCHING
// Server-side data fetching with fallbacks
// ============================================

import prisma from "@/lib/prisma";
import { cache } from "react";

// Featured services for homepage
export interface HomepageService {
  slug: string;
  name: string;
  description: string | null;
  price: number;
  icon: string;
  color: string;
  textColor: string;
}

// Featured doctors for homepage  
export interface HomepageDoctor {
  id: string;
  name: string;
  speciality: string;
  image: string;
  yearsExperience: number;
  rating: number;
  totalPatients: number;
}

// Icon mapping based on service category/name
function getServiceIcon(name: string, category: string): string {
  const iconMap: Record<string, string> = {
    behel: "grid_on",
    orthodont: "grid_on",
    scaling: "dentistry",
    tambal: "healing",
    cabut: "medical_services",
    bleaching: "auto_awesome",
    whitening: "auto_awesome",
    veneer: "add_circle",
    implant: "hardware",
    crown: "diamond",
  };

  const lowerName = name.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerName.includes(key)) return icon;
  }
  return category === "cosmetic" ? "auto_awesome" : "dentistry";
}

// Color mapping based on index
const colorPalette = [
  { color: "bg-accent-purple", textColor: "" },
  { color: "bg-primary", textColor: "text-white" },
  { color: "bg-accent-yellow", textColor: "" },
  { color: "bg-secondary", textColor: "text-white" },
  { color: "bg-gray-900", textColor: "text-white" },
  { color: "bg-secondary", textColor: "text-white" },
];

/**
 * Fetch featured services for homepage (cached)
 */
export const getHomepageServices = cache(async (): Promise<HomepageService[]> => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      take: 6,
      select: {
        slug: true,
        name: true,
        description: true,
        price: true,
        category: true,
      },
    });

    return services.map((s, i) => ({
      slug: s.slug,
      name: s.name,
      description: s.description,
      price: s.price,
      icon: getServiceIcon(s.name, s.category),
      ...colorPalette[i % colorPalette.length],
    }));
  } catch (error) {
    console.error("Error fetching homepage services:", error);
    // Return fallback data if database is unavailable
    return getFallbackServices();
  }
});

/**
 * Fetch featured doctors for homepage (cached)
 */
export const getHomepageDoctors = cache(async (): Promise<HomepageDoctor[]> => {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      orderBy: { totalPatients: "desc" },
      take: 2,
      select: {
        id: true,
        name: true,
        speciality: true,
        image: true,
        yearsExperience: true,
        rating: true,
        totalPatients: true,
      },
    });

    return doctors.map((d) => ({
      ...d,
      rating: Number(d.rating),
    }));
  } catch (error) {
    console.error("Error fetching homepage doctors:", error);
    return getFallbackDoctors();
  }
});

// ============================================
// FALLBACK DATA (for development/error cases)
// ============================================

function getFallbackServices(): HomepageService[] {
  return [
    { slug: "ortho", name: "Pemasangan Behel", description: "Rapikan susunan gigi untuk fungsi & estetika maksimal.", price: 5000000, icon: "grid_on", color: "bg-accent-purple", textColor: "" },
    { slug: "scaling", name: "Scaling Gigi", description: "Bersihkan karang gigi secara menyeluruh.", price: 300000, icon: "dentistry", color: "bg-primary", textColor: "text-white" },
    { slug: "tambal", name: "Tambal Estetik", description: "Perbaikan gigi berlubang warna natural.", price: 400000, icon: "healing", color: "bg-accent-yellow", textColor: "" },
    { slug: "cabut", name: "Cabut Gigi", description: "Prosedur aman dan minim rasa sakit.", price: 500000, icon: "medical_services", color: "bg-secondary", textColor: "text-white" },
    { slug: "bleaching", name: "Bleaching", description: "Putihkan gigi instan dalam sekali kunjungan.", price: 2500000, icon: "auto_awesome", color: "bg-gray-900", textColor: "text-white" },
    { slug: "veneer", name: "Veneer Gigi", description: "Tampilan gigi sempurna dengan lapisan tipis.", price: 3000000, icon: "add_circle", color: "bg-secondary", textColor: "text-white" },
  ];
}

function getFallbackDoctors(): HomepageDoctor[] {
  return [
    {
      id: "1",
      name: "drg. Siti Aminah Sp.KG",
      speciality: "Spesialis Gigi Anak & Konservasi",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
      yearsExperience: 12,
      rating: 4.9,
      totalPatients: 1250,
    },
    {
      id: "2",
      name: "drg. Ahmad Wijaya Sp.Ort",
      speciality: "Spesialis Ortodonti",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
      yearsExperience: 10,
      rating: 4.8,
      totalPatients: 980,
    },
  ];
}

/**
 * Format price to IDR currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
