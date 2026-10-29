"use client";

import { useState, useEffect } from "react";
import { Bell, Store } from "lucide-react";
import { Suspense } from "react";
import LiveClock from "./clock";
import { DropdownFilter } from "./dropdown";

export default function DashboardHeader() {
  return (
    <header className="bg-slate-50 px-4 py-4 border-b border-gray-100 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-900 text-white rounded-md">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-base leading-tight">
              Toko Sembako Jaya
            </h1>
            <p className="text-xs text-gray-500">Kasir: Budi (Shift Pagi)</p>
          </div>
        </div>

        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full text-gray-600 relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between pt-2">
        <Suspense fallback="Loading...">
          <DropdownFilter />
        </Suspense>
        <LiveClock />
      </div>
    </header>
  );
}
