"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchMetric, FilterRange } from "@/lib/supabase/fetch_metric";

// 1. Tentukan Tipe Data / Interface sesuai hasil respon Supabase
export interface TopBarang {
  product_name: string;
  total_qty: number;
}

export interface MetricData {
  omset_kotor: number;
  pengeluaran: number;
  profit_bersih: number;
  total_transaksi_pembelian: number;
  total_transaksi_penjualan: number;
  top_5_barang: TopBarang[];
}

// 2. Deklarasikan Objek Default (termasuk array kosong untuk top_5_barang)
const DEFAULT_METRIC_DATA: MetricData = {
  omset_kotor: 0,
  pengeluaran: 0,
  profit_bersih: 0,
  total_transaksi_pembelian: 0,
  total_transaksi_penjualan: 0,
  top_5_barang: [], // <-- Default array kosong
};

export function useDashboardMetrics() {
  const searchParams = useSearchParams();
  const currentFilter =
    (searchParams.get("filter_period") as FilterRange) || "day";
  // console.log(currentFilter);

  const { data, isPending, isError } = useQuery({
    queryKey: ["dashboard-metrics", currentFilter],
    queryFn: async () => {
      const res = await fetchMetric(currentFilter);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
  });

  return {
    filter: currentFilter,
    data: data || DEFAULT_METRIC_DATA,
    isLoading: isPending,
    isError: isError,
  };
}
