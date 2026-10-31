"use client";

import { createSupabaseClient } from "./client";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export type FilterRange = "day" | "week" | "month";

export async function fetchTransaction(range: FilterRange = "day") {
  const supabase = createSupabaseClient();

  // await delay(10000); // Simulasi delay 1 detik

  const { data, error } = await supabase.rpc("get_transaction_history", {
    period_filter: range,
  });
  if (error) {
    // console.error("❌ Fetch Gagal:", error.message);
    throw new Error(error.message);
    // KODE PERBAIKAN: Kembalikan objek status alih-alih melempar exception
    // return { data: null, error: error.message };
  }

  console.log("✅ Fetch Berhasil:", data.length);
  return { data, error: null };
}

fetchTransaction("week");
