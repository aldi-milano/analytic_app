"use client";

import {
  ReceiptText,
  Package,
  CircleUserRound,
  ChartColumnIncreasing,
} from "lucide-react";
import Link from "next/link";
import { QuickAction } from "./quick_action";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathName = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 items-center justify-between border-t bg-white/95 px-6 py-2 backdrop-blur-md">
      <Link
        href={"/dashboard"}
        className="flex flex-col items-center gap-1 text-xs font-medium text-primary"
      >
        <ChartColumnIncreasing className="h-5 w-5" />
        <span>Dashboard</span>
      </Link>

      <Link
        href={"/transaction"}
        className="flex flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600"
      >
        <ReceiptText className="h-5 w-5" />
        <span>Riwayat</span>
      </Link>

      {/* Floating Action Button (FAB) di tengah */}
      <div className="-mt-8">
        <QuickAction />
      </div>

      <button className="flex flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600">
        <Package className="h-5 w-5" />
        <span>Stok</span>
      </button>

      <button className="flex flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600">
        <CircleUserRound className="h-5 w-5" />
        <span>Profile</span>
      </button>
    </div>
  );
}
