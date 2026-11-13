"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  FilterRange,
  fetchMetric,
  fetchTransaction,
  getStok,
  GetProfitByCategory,
  CategoryProfit,
  GetWaktuTransaksi,
  GetRevenue,
  TypeRevenue,
} from "../supabase/getRPC";

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

/* --------------------------- HISTORI TRANSAKSI -------------------------- */

export interface TransactionItem {
  transaction_log: string;
  product_name: string;
  qty: number;
  amount: number;
}

export interface TransactionHistory {
  transaction_id: string;
  payment_method: string;
  cashier_shift: string;
  timestamp: string;
  total: number;
  items: TransactionItem[];
}

export function UseTransaction() {
  const searchParams = useSearchParams();
  const currentFilter =
    (searchParams.get("filter_period") as FilterRange) || "day";

  const { data, isPending, isError } = useQuery<TransactionHistory[]>({
    queryKey: ["transaction", currentFilter],
    queryFn: async () => {
      const res = await fetchTransaction(currentFilter);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
  });

  return {
    filter: currentFilter,
    data: data,
    isLoading: isPending,
    isError: isError,
  };
}

/* ------------------------------- STOK BARANG ------------------------------ */

export interface StokInformasi {
  kategori: string;
  id_produk: string;
  stok_awal: number;
  harga_beli: number;
  harga_jual: number;
  stok_akhir: number;
  nama_produk: string;
  avg_qty: number;
  rekomendasi_qty_stok: number;
}

const DEFAULT_STOK_INFORMASI: StokInformasi = {
  kategori: "",
  id_produk: "",
  stok_awal: 0,
  stok_akhir: 0,
  harga_beli: 0,
  harga_jual: 0,
  nama_produk: "",
  avg_qty: 0,
  rekomendasi_qty_stok: 0,
};

export function useStokBarang() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["items"],
    // queryFn: () => GetStok(),
    queryFn: async () => {
      const res = await getStok();
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
    enabled: typeof window !== "undefined",
  });

  return {
    data: data || [],
    isLoading: isPending,
    isError: isError,
  };
}

/* --------------------------- CHARTS SECTION DATA -------------------------- */

/* --------------------------- PROFIT PER KATEGORI -------------------------- */

export function useProfitCategory() {
  const { data, isPending, isError, isLoading, error } = useQuery({
    queryKey: ["profit-category"],
    queryFn: async () => {
      const res = await GetProfitByCategory();
      return res;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
    enabled: typeof window !== "undefined",
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error,
  };
}

/* ------------------------ WAKTU TRANSAKSI TERPADAT ------------------------ */

export interface WaktuTransaksi {
  waktu: string;
  total: number;
  fill: string;
}

export function useWaktuTransaksi() {
  const { data, isPending, isError, isLoading, error } = useQuery<
    WaktuTransaksi[]
  >({
    queryKey: ["waktuTransaksi"],
    queryFn: async () => {
      const res = await GetWaktuTransaksi();

      if (res.error) {
        // Tambahkan 'as any' agar TypeScript tidak protes mencari '.message'
        throw new Error((res.error as any).message || "Gagal mengambil data");
      }

      // Ambil res.data-nya, bukan res-nya
      return (res.data as WaktuTransaksi[]) || [];
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
    enabled: typeof window !== "undefined",
  });

  return {
    data: data || [],
    isLoading,
    isPending,
    isError,
    error,
  };
}

/* ------------------------------ DATA REVENUE ------------------------------ */

export function useRevenue() {
  const { data, isPending, isError, isLoading, error } = useQuery<
    TypeRevenue[]
  >({
    queryKey: ["revenue-transaksi"],
    queryFn: async () => {
      const res = await GetRevenue();
      return (res as TypeRevenue[]) || [];
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
    enabled: typeof window !== "undefined",
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error,
  };
}
