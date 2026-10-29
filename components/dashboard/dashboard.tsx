"use client";

import { Suspense } from "react";
import DashboardHeader from "./dashboard_header";
import { MetricCardGrid } from "./metricCardGrid";
import { Separator } from "@/components/ui/separator";
import { TopProducts } from "./topProducts";
import { useDashboardMetrics } from "@/lib/hooks/use_db_metric";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data, isLoading } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        {/* <LoaderIcon className="w-4 h-4 mr-2 animate-spin" /> */}
        <LoaderIcon className={cn("size-4 animate-spin")} />
      </div>
    );
  }
  return (
    <div>
      <DashboardHeader />
      {/* <Suspense
        fallback={
          <div className="p-4 text-xs text-muted-foreground">
            Memuat data dashboard...
          </div>
        }
      > */}
      <MetricCardGrid
        omset_kotor={data.omset_kotor}
        pengeluaran={data.pengeluaran}
        profit_bersih={data.profit_bersih}
        total_transaksi_penjualan={data.total_transaksi_penjualan}
        total_transaksi_pembelian={data.total_transaksi_pembelian}
      />
      {/* </Suspense> */}
      <div className="p-4">
        <Separator />
      </div>
      <TopProducts top_5_barang={data.top_5_barang} />
    </div>
  );
}
