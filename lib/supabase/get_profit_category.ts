"use client";

import { createSupabaseClient } from "./client";

export type CategoryProfit = {
  category: string;
  total_omzet: number;
  total_profit: number;
};

export async function GetProfitByCategory(): Promise<CategoryProfit[]> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.rpc("get_profit_by_category");
  if (error) {
    throw new Error(error.message);
  }

  // console.log("✅ Fetch Berhasil:", data);
  return data as CategoryProfit[];
}
