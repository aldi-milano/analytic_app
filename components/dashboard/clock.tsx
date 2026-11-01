"use client";
import { useState, useEffect } from "react";
import { ClockSkeleton } from "@/components/shared/skeletonClock";

export default function LiveClock() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const dayName = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
      }).format(now);
      const dateAndHour =
        now.toLocaleString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) + " WIB";
      //   setTimeString(`${dayName}, ${dateAndHour} WIB`)
      setTimeString(`${dateAndHour}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 10000); // Update tiap 10 detik

    return () => clearInterval(interval);
  }, []);

  return (
    // <span className="text-[9px] font-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
    <span className="text-[10px] text-gray-400 bg-gray-10 px-2.5 py-1">
      {timeString || <ClockSkeleton />}
    </span>
  );
}
