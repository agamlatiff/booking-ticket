"use client";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Pilih Layanan" },
  { number: 2, label: "Pilih Jadwal" },
  { number: 3, label: "Pembayaran" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-teal-500 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <div key={step.number} className="relative flex flex-col items-center z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${currentStep >= step.number
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
            >
              {currentStep > step.number ? (
                <span>✓</span>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`mt-2 text-xs md:text-sm font-medium transition-colors ${currentStep >= step.number
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-gray-500 dark:text-gray-400"
                }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
