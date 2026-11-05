import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetNotification() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative rounded-full p-2 hover:bg-slate-100"
          aria-label="Notifikasi"
        >
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-md rounded-md px-4 pb-8 pt-6">
        <div>
          <p>Ini adalah kolom notifikasi</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
