"use client";

import { Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Notification } from "./notification";
import { useStokBarang, StokInformasi } from "@/lib/hooks/use_stok";

export function SheetNotification() {
  const { data: stokBarang } = useStokBarang();
  const lowStockCount =
    stokBarang?.filter(
      (item: StokInformasi) => item.stok_akhir <= item.rekomendasi_qty_stok,
    ).length || 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <button
          type="button"
          className="relative rounded-full p-2 hover:bg-slate-100"
          aria-label="Notifikasi"
        >
          <Bell className="h-5 w-5 text-slate-600" />
          {notifCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 text-sm">
              {notifCount}
            </span>
          )}
        </button> */}
        <button
          type="button"
          className="relative rounded-full p-2 hover:bg-slate-100"
          aria-label="Notifikasi"
        >
          {/* Ikon Bell */}
          <div className="relative inline-flex items-center justify-center">
            <Bell className="h-5 w-5 text-slate-600" />

            {lowStockCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white select-none">
                {lowStockCount > 99 ? "99+" : lowStockCount}
              </span>
            )}
          </div>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-md rounded-md px-4 pb-8 pt-6">
        <div className="mt-5">
          <Notification />
        </div>
      </SheetContent>
    </Sheet>
  );
}
