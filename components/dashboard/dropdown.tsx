"use client";

import * as React from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarDays } from "lucide-react";

export function DropdownFilter() {
  // Map nilai value ke label yang ingin ditampilkan di Button
  const labels: Record<string, string> = {
    day: "Hari Ini",
    week: "Minggu Ini",
    month: "Bulan Ini",
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. AMBIL VALUE DARI URL (Default ke 'day' jika query 'day' belum ada)
  const currentFilter = searchParams.get("filter_period") || "day";

  // 2. FUNGSI UNTUK MENGUBAH URL SAAT DROPDOWN DIPIIH
  const handleValueChange = (value: string) => {
    // Salin parameter URL yang sedang aktif
    const params = new URLSearchParams(searchParams.toString());

    // Set parameter 'day' dengan value baru dari dropdown
    params.set("filter_period", value);

    // Update URL di browser tanpa me-refresh halaman (contoh: /dashboard?day=week)
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-auto h-8 text-xs px-2.5 rounded-md"
          variant="outline"
        >
          {labels[currentFilter] || "Filter"}
          <CalendarDays className="w-3 h-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
          <DropdownMenuRadioGroup
            value={currentFilter}
            onValueChange={handleValueChange}
          >
            <DropdownMenuRadioItem className="text-xs" value="day">
              Hari Ini
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="text-xs" value="week">
              Minggu Ini
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="text-xs" value="month">
              Bulan Ini
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
