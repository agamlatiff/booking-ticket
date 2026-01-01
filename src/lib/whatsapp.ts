// WhatsApp helper using Fonnte API
// Documentation: https://fonnte.com/api

interface SendWhatsAppOptions {
  to: string;
  message: string;
}

interface SendWhatsAppResult {
  success: boolean;
  error?: string;
}

/**
 * Send WhatsApp message via Fonnte API
 * @param options - { to: phone number, message: text message }
 * @returns { success: boolean, error?: string }
 */
export async function sendWhatsApp(options: SendWhatsAppOptions): Promise<SendWhatsAppResult> {
  const token = process.env.FONNTE_TOKEN;

  if (!token) {
    console.log("[DEV] WhatsApp message to", options.to, ":", options.message.substring(0, 50) + "...");
    return { success: true }; // Dev mode - skip actual sending
  }

  try {
    // Normalize phone number
    let phone = options.to.replace(/[\s-]/g, "");
    if (phone.startsWith("0")) {
      phone = "62" + phone.substring(1);
    }

    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: phone,
        message: options.message,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === false) {
        return { success: false, error: data.reason || "Unknown error" };
      }
      return { success: true };
    } else {
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.error("WhatsApp send error:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Format booking confirmation message
 */
export function formatBookingConfirmation(booking: {
  code: string;
  patientName: string;
  serviceName: string;
  doctorName: string;
  appointmentDate: Date;
  appointmentTime: string;
  dpAmount: number;
  totalPrice: number;
}): string {
  const dateStr = booking.appointmentDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `✅ *Booking Berhasil!*

Halo ${booking.patientName}!

Terima kasih telah melakukan booking. Berikut detail jadwal Anda:

📋 Kode Booking: *${booking.code}*
🦷 Layanan: ${booking.serviceName}
👨‍⚕️ Dokter: ${booking.doctorName}
📅 Tanggal: ${dateStr}
⏰ Jam: ${booking.appointmentTime}

💰 DP Dibayar: Rp ${booking.dpAmount.toLocaleString("id-ID")}
💵 Sisa Bayar: Rp ${(booking.totalPrice - booking.dpAmount).toLocaleString("id-ID")}

📍 Alamat: Jl. Kesehatan No. 123, Jakarta Selatan

Mohon datang 15 menit sebelum jadwal.

_Klinik Gigi Senyum Sejahtera_`;
}

/**
 * Format H-1 reminder message
 */
export function formatReminderMessage(booking: {
  patientName: string;
  serviceName: string;
  doctorName: string;
  appointmentDate: Date;
  appointmentTime: string;
}): string {
  const dateStr = booking.appointmentDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `🦷 *Pengingat Jadwal*

Halo ${booking.patientName}!

Ini pengingat untuk jadwal perawatan gigi Anda besok:

📅 Tanggal: ${dateStr}
⏰ Jam: ${booking.appointmentTime}
🏥 Layanan: ${booking.serviceName}
👨‍⚕️ Dokter: ${booking.doctorName}

Mohon datang 15 menit sebelum jadwal.

Terima kasih!
_Klinik Gigi Senyum Sejahtera_`;
}

/**
 * Format cancellation notification message
 */
export function formatCancellationMessage(booking: {
  code: string;
  patientName: string;
  serviceName: string;
  appointmentDate: Date;
  appointmentTime: string;
}): string {
  const dateStr = booking.appointmentDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `❌ *Booking Dibatalkan*

Halo ${booking.patientName},

Booking Anda telah dibatalkan:

📋 Kode: ${booking.code}
🦷 Layanan: ${booking.serviceName}
📅 Jadwal: ${dateStr}, ${booking.appointmentTime}

Untuk booking ulang, silakan kunjungi website kami.

_Klinik Gigi Senyum Sejahtera_`;
}
