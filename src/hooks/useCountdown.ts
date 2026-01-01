"use client";

import { useState, useEffect, useCallback } from "react";

interface UseCountdownOptions {
  onExpire?: () => void;
}

export function useCountdown(expiresAt: Date | null, options?: UseCountdownOptions) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    if (!expiresAt) return 0;
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    return Math.max(0, Math.floor((expiry - now) / 1000));
  }, [expiresAt]);

  useEffect(() => {
    if (!expiresAt) return;

    const updateTimer = () => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setIsExpired(true);
        options?.onExpire?.();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, calculateTimeLeft, options]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return {
    timeLeft,
    minutes,
    seconds,
    formatted,
    isExpired,
  };
}
