import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const stats = [
  { label: "Pasien Hari Ini", value: "8", icon: "group", color: "accent-yellow", trend: "+12%" },
  { label: "Akan Datang", value: "24", icon: "event_upcoming", color: "accent-purple", badge: "Minggu Ini" },
  { label: "Selesai", value: "45", icon: "check_circle", color: "secondary" },
  { label: "Pendapatan", value: "Rp 12.5jt", icon: "payments", color: "primary", trend: "+5%" },
];

const todaySchedule = [
  { time: "09:00", patient: "Budi Santoso", service: "Orthodontic", serviceColor: "purple", notes: "Kontrol Kawat Gigi Rutin", isActive: true },
  { time: "10:30", patient: "Siti Nurhaliza", service: "Scaling", serviceColor: "blue", notes: "Pembersihan Karang Gigi", isActive: false },
  { time: "13:00", patient: "Andi Pratama", service: "Tambal", serviceColor: "orange", notes: "Gigi Geraham Kiri Bawah", isActive: false },
  { time: "14:30", patient: "Rina Mulyani", service: "Cabut", serviceColor: "red", notes: "Sisa Akar Gigi Depan", isActive: false },
];

const tomorrowSchedule = [
  { patient: "Dewi Sartika", time: "09:00 AM", service: "Bleaching", icon: "person", color: "accent-purple" },
  { patient: "Anak Bpk. Joko", time: "10:15 AM", service: "Cabut Gigi Susu", icon: "child_care", color: "secondary" },
  { patient: "Sarah Wijaya", time: "01:00 PM", service: "Konsultasi", icon: "medical_services", color: "primary" },
];

export default async function DoctorDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "DOCTOR") {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session.user} />

      <main className="pt-32 pb-20 px-4 md:px-10 min-h-screen">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-2xl">👋</span>
                <span className="font-bold text-gray-500 uppercase tracking-wider text-xs">Doctor Dashboard</span>
              </div>
              <h1 className="font-display text-4xl font-black text-foreground">Selamat Pagi, Dok!</h1>
              <p className="text-lg text-gray-600 mt-2">Hari ini ada 8 pasien yang menanti senyum indah mereka.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/doctor/schedule">
                <button className="flex h-12 items-center justify-center rounded-full px-6 font-bold text-sm bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined mr-2 text-lg">calendar_month</span>
                  Lihat Kalender
                </button>
              </Link>
              <button className="flex h-12 items-center justify-center rounded-full bg-primary px-6 font-bold text-white text-sm border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined mr-2 text-lg">add</span>
                Pasien Baru
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="relative overflow-hidden rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-card hover:translate-y-[-4px] transition-transform duration-300">
                <div className={`absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-${stat.color}/20 -mr-4 -mt-4`}></div>
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-foreground bg-${stat.color} ${stat.color === "secondary" || stat.color === "primary" ? "text-white" : "text-foreground"}`}>
                    <span className="material-symbols-outlined">{stat.icon}</span>
                  </div>
                  {stat.trend && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700 border border-green-200">{stat.trend}</span>
                  )}
                  {stat.badge && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-bold text-gray-700 border border-gray-200">{stat.badge}</span>
                  )}
                </div>
                <p className="text-sm font-bold text-gray-500">{stat.label}</p>
                <h3 className="text-4xl font-black text-foreground">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Today Schedule */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-foreground">Jadwal Hari Ini</h2>
                <Link href="/doctor/schedule" className="text-sm font-bold text-primary hover:underline">Lihat Semua</Link>
              </div>
              <div className="space-y-4">
                {todaySchedule.map((item, i) => (
                  <div key={i} className="group flex flex-col md:flex-row items-start md:items-center gap-4 rounded-[1.5rem] border-2 border-foreground bg-white p-5 shadow-card hover:shadow-pop transition-all">
                    <div className={`flex md:flex-col items-center gap-2 md:gap-0 px-4 py-2 rounded-xl border min-w-[100px] justify-center text-center ${item.isActive ? "bg-accent-yellow/20 border-accent-yellow/50" : "bg-gray-50 border-gray-200"}`}>
                      <span className={`text-lg font-black ${item.isActive ? "text-foreground" : "text-gray-500"}`}>{item.time}</span>
                      <span className={`text-xs font-bold ${item.isActive ? "text-gray-600" : "text-gray-400"}`}>AM</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-bold text-foreground">{item.patient}</h4>
                        <span className={`px-2 py-0.5 rounded-md bg-${item.serviceColor}-100 text-${item.serviceColor}-700 text-xs font-bold border border-${item.serviceColor}-200`}>
                          {item.service}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">history</span>
                        {item.notes}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                      {item.isActive ? (
                        <>
                          <button className="h-10 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-100">
                            Detail
                          </button>
                          <button className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold flex-1 md:flex-none flex items-center justify-center gap-2 border-2 border-foreground shadow-pop hover:shadow-pop-hover transition-all">
                            <span className="material-symbols-outlined text-sm">play_arrow</span>
                            Mulai
                          </button>
                        </>
                      ) : (
                        <button className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-foreground hover:bg-gray-50 transition-colors">
                          <span className="material-symbols-outlined text-gray-500">more_horiz</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tomorrow Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] border-2 border-foreground p-6 shadow-card sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-foreground">Besok</h2>
                  <button className="h-8 w-8 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-gray-100">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {tomorrowSchedule.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-colors border border-transparent hover:border-foreground cursor-pointer">
                      <div className={`h-12 w-12 rounded-full bg-${item.color}/20 flex items-center justify-center text-${item.color} border border-${item.color}`}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-foreground">{item.patient}</h5>
                        <p className="text-xs text-gray-500">{item.time} • {item.service}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
                  <div className="bg-background rounded-xl p-4 border border-foreground">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-accent-yellow text-2xl drop-shadow-sm">lightbulb</span>
                      <div>
                        <h5 className="font-bold text-sm">Tips Hari Ini</h5>
                        <p className="text-xs text-gray-600 mt-1">Jangan lupa istirahat 15 menit setelah pasien ke-3 untuk menjaga fokus.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
