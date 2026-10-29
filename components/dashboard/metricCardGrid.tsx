"use client";

import { useDashboardMetrics } from "@/lib/hooks/use_db_metric";
import { cn } from "@/lib/utils";
import { Wallet, TrendingUp, TrendingDown, LoaderIcon } from "lucide-react";
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
  // const { data, isLoading } = useDashboardMetrics();

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center w-full h-screen">
  //       {/* <LoaderIcon className="w-4 h-4 mr-2 animate-spin" /> */}
  //       <LoaderIcon className={cn("size-4 animate-spin")} />
  //     </div>
  //   );
  // }

  //   interface CardProps {
  //     {
  //     "omset_kotor": 255500,
  //     "pengeluaran": 0,
  //     "profit_bersih": 255500,
  //     "total_transaksi_pembelian": 0,
  //     "total_transaksi_penjualan": 7,
  //     "top_5_barang": [
  //         {
  //             "product_name": "Roma Malkist",
  //             "total_qty": 5
  //         },
  //         {
  //             "product_name": "Aqua",
  //             "total_qty": 4
  //         },
  //         {
  //             "product_name": "Gas 3kg",
  //             "total_qty": 3
  //         },
  //         {
  //             "product_name": "Kecap",
  //             "total_qty": 3
  //         },
  //         {
  //             "product_name": "Indomie Bawang",
  //             "total_qty": 3
  //         }
  //     ]
  // }
  //}

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
          icon={TrendingUp}
          variant="emerald"
        />

        {/* Card 3: Pengeluaran */}
        <StatCard
          title="Pengeluaran"
          amount={pengeluaran}
          subtitle={total_transaksi_pembelian + " Transaksi"}
          icon={TrendingDown}
          variant="rose"
        />
      </div>
    </div>
  );
}
