import { LayoutDashboard, ReceiptText, Package, Settings } from "lucide-react";
import { QuickAction } from "./quick_action";

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 items-center justify-between border-t bg-white/95 px-6 py-2 backdrop-blur-md">
      <button className="flex flex-col items-center gap-1 text-xs font-medium text-primary">
        <LayoutDashboard className="h-5 w-5" />
        <span>Home</span>
      </button>

      <button className="flex flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600">
        <ReceiptText className="h-5 w-5" />
        <span>Riwayat</span>
      </button>

      {/* Floating Action Button (FAB) di tengah */}
      <div className="-mt-8">
        <QuickAction />
      </div>

      <button className="flex flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600">
        <Package className="h-5 w-5" />
        <span>Stok</span>
      </button>

      <button className="flex flex-col items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600">
        <Settings className="h-5 w-5" />
        <span>Pengaturan</span>
      </button>
    </div>
  );
}