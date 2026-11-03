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
        <Bell className="h-5 w-5 text-slate-600" />
      </SheetTrigger>
      <SheetContent>
        <div>
          <p>Ini adalah kolom notifikasi</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
