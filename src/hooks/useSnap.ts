"use client";

import { useEffect, useRef, useCallback } from "react";

// Midtrans Snap global type
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: MidtransResult) => void;
          onPending?: (result: MidtransResult) => void;
          onError?: (result: MidtransResult) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

interface MidtransResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status?: string;
}

interface UseSnapOptions {
  onSuccess?: (result: MidtransResult) => void;
  onPending?: (result: MidtransResult) => void;
  onError?: (result: MidtransResult) => void;
  onClose?: () => void;
}

/**
 * Hook to use Midtrans Snap payment popup
 */
export function useSnap(options: UseSnapOptions = {}) {
  const isLoaded = useRef(false);

  // Load Snap.js script
  useEffect(() => {
    if (isLoaded.current) return;

    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";

    if (!clientKey) {
      console.warn("Midtrans client key not configured");
      return;
    }

    const scriptUrl = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      isLoaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    script.onload = () => {
      isLoaded.current = true;
    };

    script.onerror = () => {
      console.error("Failed to load Midtrans Snap.js");
    };

    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount - it should persist
    };
  }, []);

  // Open Snap payment popup
  const pay = useCallback(
    (token: string) => {
      if (!window.snap) {
        console.error("Snap.js not loaded yet");
        return;
      }

      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("Payment success:", result);
          options.onSuccess?.(result);
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
          options.onPending?.(result);
        },
        onError: (result) => {
          console.error("Payment error:", result);
          options.onError?.(result);
        },
        onClose: () => {
          console.log("Payment popup closed");
          options.onClose?.();
        },
      });
    },
    [options]
  );

  return { pay, isReady: isLoaded.current };
}

export type { MidtransResult };
