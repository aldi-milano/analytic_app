"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, TrendingUp, Lightbulb } from "lucide-react"; // Standar bawaan dari Shadcn UI

interface CollapsibleProps {
  title: string;
  children: ReactNode;
}

export default function Collapsible({ title, children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4 w-full">
      <div className="border w-full max-w-md bg-sky-50 border-blue-100/80 rounded-md overflow-hidden shadow-sm mt-4 px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between min-h-[60px] text-left focus:outline-none"
          aria-expanded={isOpen}
        >
          <span className="text-base font-semibold text-slate-900 flex flex-row gap-2 items-center">
            <TrendingUp className="text-sky-600 h-4 w-4" />
            {title}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-sky-900 transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Trik CSS Grid untuk animasi buka/tutup yang mulus tanpa JS yang berat */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-0 pb-4 text-sm text-slate-800 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
