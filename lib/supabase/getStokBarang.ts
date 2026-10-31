"use client";

import { createSupabaseClient } from "./client";

export async function GetStok() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("get_stok");
  if (error) {
    throw new Error(error.message);
  }

  // console.log("✅ Fetch Berhasil:", data);
  return { data, error: null };
}

GetStok();
