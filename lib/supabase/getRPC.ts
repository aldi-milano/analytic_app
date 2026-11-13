"use client";

import { createSupabaseClient } from "./client";

export type FilterRange = "day" | "week" | "month";
const supabase = createSupabaseClient();

/* -------------------------- GET METRIC CARD DATA -------------------------- */

export async function fetchMetric(range: FilterRange = "day") {
  const { data, error } = await supabase.rpc("get_db_summary", {
    filter_range: range,
  });
  if (error) {
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

/* -------------------------- GET HISTORI TRANSAKSI ------------------------- */

export async function fetchTransaction(range: FilterRange = "day") {
  const { data, error } = await supabase.rpc("get_transaction_history", {
    period_filter: range,
  });
  if (error) {
    throw new Error(error.message);
  }
  return { data, error: null };
}

/* ----------------------------- GET STOK BARANG ---------------------------- */

export async function getStok() {
  const { data, error } = await supabase.rpc("get_stok");
  if (error) {
    throw new Error(error.message);
  }
  return { data, error: null };
}

/* ----------------------------- CHARTS SECTION ----------------------------- */

/* --------------------------- PROFIT PER KATEGORI -------------------------- */

export type CategoryProfit = {
  category: string;
  total_omzet: number;
  total_profit: number;
};

export async function GetProfitByCategory(): Promise<CategoryProfit[]> {
  const { data, error } = await supabase.rpc("get_profit_by_category");
  if (error) {
    throw new Error(error.message);
  }

  return data as CategoryProfit[];
}

/* ------------------------ WAKTU TRANSAKSI TERPADAT ------------------------ */

export async function GetWaktuTransaksi() {
  const { data, error } = await supabase.rpc("waktutransaksi");
  if (error) {
    throw new Error(error.message);
  }

  return { data, error: null };
}

/* ------------------------------ DATA REVENUE ------------------------------ */

export type TypeRevenue = {
  bulan: string;
  total_transaksi: number;
};

export async function GetRevenue(): Promise<TypeRevenue[]> {
  const { data, error } = await supabase.rpc("revenue");
  if (error) {
    throw new Error(error.message);
  }

  return data as TypeRevenue[];
}
