"use client";

import { createSupabaseClient } from "./client";

export type FilterRange = "day" | "week" | "month";

export async function fetchTransaction(range: FilterRange = "day") {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.rpc("get_transaction_history", {
    period_filter: range,
  });
  if (error) {
    throw new Error(error.message);
  }

  console.log("✅ Fetch Berhasil:", data);
  return { data, error: null };
}

fetchTransaction("day");
