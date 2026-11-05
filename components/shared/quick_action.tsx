"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormTransaksi from "./formTransaksi";

export function QuickAction() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="h-12 w-12 rounded-md shadow-sm hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="h-14 w-14" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-w-md rounded-md px-4 pb-8 pt-6 h-[80%]"
      >
        <FormTransaksi />
      </SheetContent>
    </Sheet>
  );
}
