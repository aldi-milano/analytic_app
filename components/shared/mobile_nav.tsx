"use client";

import {
  ReceiptText,
  Package,
  ChartColumnIncreasing,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { QuickAction } from "./quick_action";
import { usePathname } from "next/navigation";
import { AlertLogout } from "./logout";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export function MobileNav() {
  const pathName = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 grid grid-cols-5 justify-items-center items-center justify-between border-t bg-slate-50 py-3 backdrop-blur-md">
      <Link
        href={"/dashboard"}
        className="flex flex-1 flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 hover:scale-105"
      >
        <ChartColumnIncreasing className="h-5 w-5" />
        <span>Dashboard</span>
      </Link>

      <Link
        href={"/transaction"}
        className="flex flex-1 flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 hover:scale-105"
      >
        <ReceiptText className="h-5 w-5" />
        <span>Riwayat</span>
      </Link>

      <Link
        href={"/cashier"}
        className="flex flex-1 flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 hover:scale-105"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Transaksi</span>
      </Link>

      <Link
        href={"/stock"}
        className="flex flex-1 flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 hover:scale-105"
      >
        <Package className="h-5 w-5" />
        <span>Stok</span>
      </Link>

      <div className="flex flex-1 flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 hover:scale-105">
        <AlertLogout />
        <span>Logout</span>
      </div>
    </div>
  );
}
