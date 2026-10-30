"use client";

import { Wallet, BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { StatCard } from "@/components/shared/card";

interface CardProps {
  omset_kotor: number;
  pengeluaran: number;
  profit_bersih: number;
  total_transaksi_penjualan: number;
  total_transaksi_pembelian: number;
}

export function MetricCardGrid({
  omset_kotor,
  pengeluaran,
  profit_bersih,
  total_transaksi_penjualan,
  total_transaksi_pembelian,
}: CardProps) {
  return (
    <div className="p-4 space-y-4">
      {/* Grid 3 Card */}
      <div className="grid grid-cols-2 gap-4">
        {/* Card 1: Profit Bersih */}
        <div className="col-span-2">
          <StatCard
            title="Profit Bersih"
            amount={profit_bersih}
            // subtitle="3 Transaksi"
            icon={Wallet}
            variant="blue"
            className="[&_p]:text-2xl [&_span]:text-base"
            size="lg"
          />
        </div>

        {/* Card 2: Pemasukan */}
        <StatCard
          title="Pemasukan"
          amount={omset_kotor}
          subtitle={total_transaksi_penjualan + " Transaksi"}
          icon={BanknoteArrowDown}
          variant="emerald"
        />

        {/* Card 3: Pengeluaran */}
        <StatCard
          title="Pengeluaran"
          amount={pengeluaran}
          subtitle={total_transaksi_pembelian + " Transaksi"}
          icon={BanknoteArrowUp}
          variant="yellow"
        />
      </div>
    </div>
  );
}
