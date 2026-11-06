"use client";

import { createSupabaseClient } from "./client";

export async function GetWaktuTransaksi() {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.rpc("waktutransaksi");
  if (error) {
    throw new Error(error.message);
  }

  // console.log("✅ Fetch Berhasil:", data);
  return { data, error: null };
}

