"use client";

import { MetricCardGrid } from "./metricCardGrid";
import { useDashboardMetrics } from "@/lib/hooks/use_db_metric";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductsWrapper } from "./productsWrapper";
import { LineSeparator } from "../shared/separator";

export default function Dashboard() {
  const { data, isLoading } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoaderIcon className={cn("size-4 animate-spin")} />
      </div>
    );
  }
  return (
    <div className="pb-24">
      <MetricCardGrid
        omset_kotor={data.omset_kotor}
        pengeluaran={data.pengeluaran}
        profit_bersih={data.profit_bersih}
        total_transaksi_penjualan={data.total_transaksi_penjualan}
        total_transaksi_pembelian={data.total_transaksi_pembelian}
      />
      <LineSeparator />
      <ProductsWrapper
        top={data.top_5_barang}
        bottom={data.top_5_least_barang}
      />
    </div>
  );
}
