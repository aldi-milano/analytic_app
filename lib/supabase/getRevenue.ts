"use client";

import { createSupabaseClient } from "./client";

export type TypeRevenue = {
  bulan: string;
  total_transaksi: number;
};

export async function GetRevenue(): Promise<TypeRevenue[]> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.rpc("revenue");
  if (error) {
    throw new Error(error.message);
  }

  // console.log("✅ Fetch Berhasil:", data);
  return data as TypeRevenue[];
}

