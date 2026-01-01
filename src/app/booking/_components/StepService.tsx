"use client";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  dpAmount: number;
  duration: number;
  image: string | null;
}

interface StepServiceProps {
  services: Service[];
  selectedService: Service | null;
  onSelect: (service: Service) => void;
}

const serviceIcons: Record<string, string> = {
  "scaling-polishing": "🪥",
  "cabut-gigi": "🦷",
  "tambal-gigi": "🔧",
  "veneer-gigi": "✨",
  "behel-kawat": "😁",
  "bleaching": "🌟",
  "konsultasi": "💬",
};

export default function StepService({ services, selectedService, onSelect }: StepServiceProps) {
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Pilih Layanan
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Pilih jenis perawatan gigi yang Anda butuhkan
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className={`group p-5 rounded-xl border-2 text-left transition-all duration-200 ${selectedService?.id === service.id
                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                : "border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 hover:bg-gray-50 dark:hover:bg-gray-750"
              }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${selectedService?.id === service.id
                    ? "bg-teal-500 text-white"
                    : "bg-teal-100 dark:bg-teal-900/50"
                  }`}
              >
                {serviceIcons[service.slug] || "🦷"}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold text-lg mb-1 ${selectedService?.id === service.id
                      ? "text-teal-700 dark:text-teal-300"
                      : "text-gray-900 dark:text-white"
                    }`}
                >
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {service.description}
                </p>

                {/* Price & Duration */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-teal-600 dark:text-teal-400">
                    Rp {service.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xs bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 px-2 py-1 rounded-full">
                    DP: Rp {service.dpAmount.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xs text-gray-400">
                    ⏱ {service.duration} menit
                  </span>
                </div>
              </div>

              {/* Check */}
              {selectedService?.id === service.id && (
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
