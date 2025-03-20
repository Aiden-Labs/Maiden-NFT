"use client";

import { useCallback, useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date | string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const calculateTimeLeft = useCallback(() => {
    try {
      const target = new Date(targetDate);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (isNaN(difference)) {
        throw new Error("Invalid date");
      }

      if (difference <= 0) {
        return { days: "00", hours: "00", minutes: "00", seconds: "00" };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
    } catch (error) {
      console.error("Error calculating time left:", error);
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-2">
        {[
          timeLeft.days,
          timeLeft.hours,
          timeLeft.minutes,
          timeLeft.seconds,
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-lg bg-muted px-2 py-1"
          >
            <span className="text-s font-mono font-bold">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
