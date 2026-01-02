import { PrismaClient, RoleUser, DayOfWeek } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // ============================================
  // 1. Create Admin User
  // ============================================
  console.log("👤 Creating admin user...");
  const admin = await prisma.user.upsert({
    where: { email: "admin@klinik.com" },
    update: {},
    create: {
      email: "admin@klinik.com",
      name: "Admin Klinik",
      role: RoleUser.ADMIN,
      phone: "081234567890",
    },
  });
  console.log(`   ✅ Admin created: ${admin.email}`);

  // ============================================
  // 2. Create Doctors
  // ============================================
  console.log("👨‍⚕️ Creating doctors...");

  const doctors = await Promise.all([
    prisma.doctor.upsert({
      where: { id: "doctor-1" },
      update: {},
      create: {
        id: "doctor-1",
        name: "drg. Handoko, Sp.KG",
        speciality: "Spesialis Konservasi Gigi",
        bio: "Berpengalaman lebih dari 15 tahun dalam perawatan gigi konservatif dan estetik.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
        phone: "081234567891",
        yearsExperience: 15,
        rating: 4.9,
        totalPatients: 450,
        isActive: true,
      },
    }),
    prisma.doctor.upsert({
      where: { id: "doctor-2" },
      update: {},
      create: {
        id: "doctor-2",
        name: "drg. Sinta Dewi",
        speciality: "Dokter Gigi Umum",
        bio: "Fokus pada perawatan gigi anak dan dewasa dengan pendekatan yang ramah.",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
        phone: "081234567892",
        yearsExperience: 8,
        rating: 4.8,
        totalPatients: 320,
        isActive: true,
      },
    }),
    prisma.doctor.upsert({
      where: { id: "doctor-3" },
      update: {},
      create: {
        id: "doctor-3",
        name: "drg. Budi Santoso, Sp.Ort",
        speciality: "Spesialis Ortodonti",
        bio: "Ahli dalam pemasangan behel dan koreksi susunan gigi.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
        phone: "081234567893",
        yearsExperience: 12,
        rating: 5.0,
        totalPatients: 280,
        isActive: true,
      },
    }),
  ]);
  console.log(`   ✅ Created ${doctors.length} doctors`);

  // ============================================
  // 3. Create Services
  // ============================================
  console.log("🦷 Creating services...");

  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: "scaling-polishing" },
      update: {},
      create: {
        name: "Scaling & Polishing",
        slug: "scaling-polishing",
        description: "Pembersihan karang gigi dan pemolesan untuk gigi yang lebih bersih dan sehat.",
        price: 350000,
        dpAmount: 100000,
        category: "general",
        duration: 60,
        order: 1,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "cabut-gigi" },
      update: {},
      create: {
        name: "Cabut Gigi",
        slug: "cabut-gigi",
        description: "Pencabutan gigi dengan teknik modern dan minim rasa sakit.",
        price: 500000,
        dpAmount: 150000,
        category: "general",
        duration: 60,
        order: 2,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "tambal-gigi" },
      update: {},
      create: {
        name: "Tambal Gigi",
        slug: "tambal-gigi",
        description: "Penambalan gigi berlubang dengan bahan berkualitas tinggi.",
        price: 300000,
        dpAmount: 100000,
        category: "general",
        duration: 60,
        order: 3,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "veneer-gigi" },
      update: {},
      create: {
        name: "Veneer Gigi",
        slug: "veneer-gigi",
        description: "Pelapisan gigi untuk tampilan lebih putih dan rapi.",
        price: 3500000,
        dpAmount: 1000000,
        category: "cosmetic",
        duration: 120,
        order: 4,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "behel-kawat" },
      update: {},
      create: {
        name: "Pasang Behel / Kawat Gigi",
        slug: "behel-kawat",
        description: "Pemasangan behel untuk merapikan susunan gigi.",
        price: 8000000,
        dpAmount: 2000000,
        category: "orthodontic",
        duration: 120,
        order: 5,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "bleaching" },
      update: {},
      create: {
        name: "Bleaching / Pemutihan Gigi",
        slug: "bleaching",
        description: "Pemutihan gigi profesional untuk senyum yang lebih cerah.",
        price: 2500000,
        dpAmount: 750000,
        category: "cosmetic",
        duration: 90,
        order: 6,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "konsultasi" },
      update: {},
      create: {
        name: "Konsultasi",
        slug: "konsultasi",
        description: "Konsultasi dan pemeriksaan kesehatan gigi secara menyeluruh.",
        price: 150000,
        dpAmount: 50000,
        category: "general",
        duration: 30,
        order: 0,
        isActive: true,
      },
    }),
  ]);
  console.log(`   ✅ Created ${services.length} services`);

  // ============================================
  // 4. Create Schedule Templates
  // ============================================
  console.log("📅 Creating schedule templates...");

  const weekdays = [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
  ];

  // Doctor 1: Mon-Fri 09:00-17:00, Sat 09:00-14:00
  for (const day of weekdays) {
    await prisma.scheduleTemplate.upsert({
      where: { doctorId_dayOfWeek: { doctorId: "doctor-1", dayOfWeek: day } },
      update: {},
      create: {
        doctorId: "doctor-1",
        dayOfWeek: day,
        startTime: "09:00",
        endTime: "17:00",
        slotDuration: 60,
        isActive: true,
      },
    });
  }
  await prisma.scheduleTemplate.upsert({
    where: { doctorId_dayOfWeek: { doctorId: "doctor-1", dayOfWeek: DayOfWeek.SATURDAY } },
    update: {},
    create: {
      doctorId: "doctor-1",
      dayOfWeek: DayOfWeek.SATURDAY,
      startTime: "09:00",
      endTime: "14:00",
      slotDuration: 60,
      isActive: true,
    },
  });

  // Doctor 2: Mon-Fri 10:00-18:00
  for (const day of weekdays) {
    await prisma.scheduleTemplate.upsert({
      where: { doctorId_dayOfWeek: { doctorId: "doctor-2", dayOfWeek: day } },
      update: {},
      create: {
        doctorId: "doctor-2",
        dayOfWeek: day,
        startTime: "10:00",
        endTime: "18:00",
        slotDuration: 60,
        isActive: true,
      },
    });
  }

  // Doctor 3: Mon, Wed, Fri 09:00-17:00
  const doctor3Days = [DayOfWeek.MONDAY, DayOfWeek.WEDNESDAY, DayOfWeek.FRIDAY];
  for (const day of doctor3Days) {
    await prisma.scheduleTemplate.upsert({
      where: { doctorId_dayOfWeek: { doctorId: "doctor-3", dayOfWeek: day } },
      update: {},
      create: {
        doctorId: "doctor-3",
        dayOfWeek: day,
        startTime: "09:00",
        endTime: "17:00",
        slotDuration: 60,
        isActive: true,
      },
    });
  }

  console.log("   ✅ Created schedule templates for all doctors");

  // ============================================
  // 5. Generate Time Slots for Next 2 Weeks
  // ============================================
  console.log("⏰ Generating time slots for next 2 weeks...");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayOfWeekMap: Record<number, DayOfWeek> = {
    0: DayOfWeek.SUNDAY,
    1: DayOfWeek.MONDAY,
    2: DayOfWeek.TUESDAY,
    3: DayOfWeek.WEDNESDAY,
    4: DayOfWeek.THURSDAY,
    5: DayOfWeek.FRIDAY,
    6: DayOfWeek.SATURDAY,
  };

  const templates = await prisma.scheduleTemplate.findMany({
    where: { isActive: true },
  });

  let slotsCreated = 0;

  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);
    const dayOfWeek = dayOfWeekMap[date.getDay()];

    const dayTemplates = templates.filter((t) => t.dayOfWeek === dayOfWeek);

    for (const template of dayTemplates) {
      const [startHour, startMin] = template.startTime.split(":").map(Number);
      const [endHour, endMin] = template.endTime.split(":").map(Number);

      let currentHour = startHour;
      let currentMin = startMin;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMin < endMin)
      ) {
        const slotStartTime = `${String(currentHour).padStart(2, "0")}:${String(currentMin).padStart(2, "0")}`;

        // Calculate end time
        let slotEndHour = currentHour;
        let slotEndMin = currentMin + template.slotDuration;
        if (slotEndMin >= 60) {
          slotEndHour += Math.floor(slotEndMin / 60);
          slotEndMin = slotEndMin % 60;
        }

        // Don't create slot if it exceeds end time
        if (
          slotEndHour > endHour ||
          (slotEndHour === endHour && slotEndMin > endMin)
        ) {
          break;
        }

        const slotEndTime = `${String(slotEndHour).padStart(2, "0")}:${String(slotEndMin).padStart(2, "0")}`;

        await prisma.timeSlot.upsert({
          where: {
            doctorId_date_startTime: {
              doctorId: template.doctorId,
              date: date,
              startTime: slotStartTime,
            },
          },
          update: {},
          create: {
            doctorId: template.doctorId,
            date: date,
            startTime: slotStartTime,
            endTime: slotEndTime,
            isAvailable: true,
          },
        });

        slotsCreated++;

        // Move to next slot
        currentMin += template.slotDuration;
        if (currentMin >= 60) {
          currentHour += Math.floor(currentMin / 60);
          currentMin = currentMin % 60;
        }
      }
    }
  }

  console.log(`   ✅ Created ${slotsCreated} time slots`);

  // ============================================
  // 6. Create Gallery Images
  // ============================================
  console.log("📸 Creating gallery images...");

  const galleryImages = await Promise.all([
    prisma.galleryImage.upsert({
      where: { id: "gallery-1" },
      update: {},
      create: {
        id: "gallery-1",
        title: "Before After Scaling",
        imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
        category: "BEFORE_AFTER",
        order: 1,
        isActive: true,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: "gallery-2" },
      update: {},
      create: {
        id: "gallery-2",
        title: "Ruang Praktik Modern",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
        category: "CLINIC",
        order: 2,
        isActive: true,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: "gallery-3" },
      update: {},
      create: {
        id: "gallery-3",
        title: "Tim Dokter Kami",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        category: "TEAM",
        order: 3,
        isActive: true,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: "gallery-4" },
      update: {},
      create: {
        id: "gallery-4",
        title: "Before After Veneer",
        imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800",
        category: "BEFORE_AFTER",
        order: 4,
        isActive: true,
      },
    }),
  ]);
  console.log(`   ✅ Created ${galleryImages.length} gallery images`);

  // ============================================
  // 7. Create Clinic Settings
  // ============================================
  console.log("⚙️ Creating clinic settings...");

  await prisma.clinicSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      clinicName: "Klinik Gigi Senyum Sejahtera",
      address: "Jl. Kesehatan No. 123, Jakarta Selatan",
      phone: "021-12345678",
      email: "info@senyumsejahtera.com",
      whatsappNumber: "6285922430828",
      operationalHours: JSON.stringify({
        monday: { open: "09:00", close: "17:00" },
        tuesday: { open: "09:00", close: "17:00" },
        wednesday: { open: "09:00", close: "17:00" },
        thursday: { open: "09:00", close: "17:00" },
        friday: { open: "09:00", close: "17:00" },
        saturday: { open: "09:00", close: "14:00" },
        sunday: { open: null, close: null },
      }),
      paymentTimeout: 15,
      reminderHours: 24,
    },
  });
  console.log("   ✅ Clinic settings created");

  console.log("\n🎉 Seed completed successfully!");
  console.log("================================");
  console.log("📧 Admin login: admin@klinik.com (use Google OAuth)");
  console.log(`👨‍⚕️ Doctors: ${doctors.length}`);
  console.log(`🦷 Services: ${services.length}`);
  console.log(`⏰ Time Slots: ${slotsCreated}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });