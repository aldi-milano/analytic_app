import { Store, Bell } from "lucide-react";
import LiveClock from "@/components/dashboard/clock";
import { DropdownFilter } from "../dashboard/dropdown";
import { Suspense } from "react";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex flex-col gap-2 p-4 pb-2 border-b bg-slate-50 px-4 py-3">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none">Toko Sauyunan</h1>
            <span className="text-[11px] text-muted-foreground">
              Kasir: Budi (Shift Pagi)
            </span>
          </div>
        </div>
        <button
          className="relative rounded-full p-2 hover:bg-slate-100"
          aria-label="Notifikasi"
        >
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>
      <div className="flex items-center justify-between w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <DropdownFilter />
        </Suspense>
        <LiveClock />
      </div>
    </header>
  );
}
