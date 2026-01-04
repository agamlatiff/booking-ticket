"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Terjadi Kesalahan
          </h1>

          <p className="text-gray-600 mb-6">
            Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi atau
            kembali ke halaman utama.
          </p>

          {process.env.NODE_ENV === "development" && error.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => reset()} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Coba Lagi
            </Button>
            <Button asChild>
              <Link href="/" className="gap-2">
                <Home className="w-4 h-4" />
                Ke Beranda
              </Link>
            </Button>
          </div>

          {error.digest && (
            <p className="text-xs text-gray-400 mt-6">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
