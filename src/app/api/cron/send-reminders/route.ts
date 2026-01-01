import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Cron job to send H-1 reminders via WhatsApp
// Should be called daily (e.g., at 6 PM for next day appointments)
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    // Find paid bookings for tomorrow that haven't received reminders
    const bookings = await prisma.booking.findMany({
      where: {
        status: "PAID",
        appointmentDate: {
          gte: tomorrow,
          lt: dayAfterTomorrow,
        },
        reminderSent: false,
      },
      include: {
        service: { select: { name: true } },
        doctor: { select: { name: true } },
      },
    });

    if (bookings.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No reminders to send",
        sent: 0,
      });
    }

    let remindersSent = 0;
    const fonnteTtoken = process.env.FONNTE_TOKEN;

    for (const booking of bookings) {
      try {
        // Format reminder message
        const message = `🦷 *Pengingat Jadwal*\n\nHalo ${booking.patientName}!\n\nIni pengingat untuk jadwal perawatan gigi Anda besok:\n\n📅 Tanggal: ${booking.appointmentDate.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\n⏰ Jam: ${booking.appointmentTime}\n🏥 Layanan: ${booking.service.name}\n👨‍⚕️ Dokter: ${booking.doctor.name}\n\nMohon datang 15 menit sebelum jadwal.\n\nTerima kasih!\n_Klinik Gigi Senyum Sejahtera_`;

        // Send via Fonnte (WhatsApp Gateway)
        if (fonnteTtoken) {
          const response = await fetch("https://api.fonnte.com/send", {
            method: "POST",
            headers: {
              Authorization: fonnteTtoken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              target: booking.patientPhone,
              message,
            }),
          });

          if (response.ok) {
            // Mark reminder as sent
            await prisma.booking.update({
              where: { id: booking.id },
              data: { reminderSent: true },
            });
            remindersSent++;
          } else {
            console.error(`Failed to send reminder for ${booking.code}`);
          }
        } else {
          // If no Fonnte token, just mark as sent (development)
          await prisma.booking.update({
            where: { id: booking.id },
            data: { reminderSent: true },
          });
          remindersSent++;
          console.log(`[DEV] Reminder for ${booking.code}: ${booking.patientPhone}`);
        }
      } catch (err) {
        console.error(`Error sending reminder for ${booking.code}:`, err);
      }
    }

    console.log(`Sent ${remindersSent} reminders for tomorrow's appointments`);

    return NextResponse.json({
      success: true,
      message: `Sent ${remindersSent} reminders`,
      sent: remindersSent,
      total: bookings.length,
    });
  } catch (error) {
    console.error("Error sending reminders:", error);
    return NextResponse.json(
      { error: "Failed to send reminders" },
      { status: 500 }
    );
  }
}
