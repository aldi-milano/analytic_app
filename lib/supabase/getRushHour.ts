"use client";

import { createSupabaseClient } from "./client";

export type FilterRange = 7 | 30 | 90;

export async function GetRushHour(range: FilterRange = 7) {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.rpc("getwaktutransaksi", {
    p_days: range,
  });
  if (error) {
    throw new Error(error.message);
  }

  // console.log("✅ Fetch Berhasil:", data);
  return { data, error: null };
}

