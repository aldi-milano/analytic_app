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

export function QuickAction() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-8 pt-6">
        <SheetHeader className="text-left mb-4">
          <SheetTitle>Catat Transaksi Baru</SheetTitle>
        </SheetHeader>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs font-medium text-slate-600">Tipe Transaksi</label>
            <Select defaultValue="pemasukan">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pemasukan">Penjualan (Pemasukan)</SelectItem>
                <SelectItem value="pengeluaran">Kulakan / Beban (Pengeluaran)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Nominal (Rp)</label>
            <Input type="number" placeholder="0" className="mt-1 text-lg font-bold" />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Keterangan / Nama Barang</label>
            <Input placeholder="Contoh: Minyak Goreng 2L" className="mt-1" />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Metode Pembayaran</label>
            <Select defaultValue="tunai">
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Metode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tunai">Tunai / Cash</SelectItem>
                <SelectItem value="qris">QRIS</SelectItem>
                <SelectItem value="transfer">Transfer Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full mt-2" size="lg">
            Simpan Transaksi
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}