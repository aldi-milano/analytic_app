"use client";

import { createSupabaseClient } from "./client";

export type FilterRange = "days" | "week" | "month";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchMetric(range: FilterRange = "days") {
  const supabase = createSupabaseClient();

  // await delay(10000); // Simulasi delay 1 detik

  const { data, error } = await supabase.rpc("get_db_summary", {
    filter_range: range,
  });
  if (error) {
    console.error("❌ Fetch Gagal:", error.message);
    throw new Error(error.message);
    // KODE PERBAIKAN: Kembalikan objek status alih-alih melempar exception
    // return { data: null, error: error.message };
  }

  console.log("✅ Fetch Berhasil:", data);
  return { data, error: null };
}
