import { createSupabaseClient } from "../supabase/client";

export async function InsertTransaksi(
  cart: any[],
  tipeTransaksi: "penjualan" | "pembelian",
) {
  const supabase = createSupabaseClient();
  const transactionId = `TRX-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    // Panggil RPC, kirim cart langsung sebagai JSON
    const { error } = await supabase.rpc("simpan_transaksi", {
      p_transaction_id: transactionId,
      p_type_transaction: tipeTransaksi,
      p_cashier: "Teh Ani", // Bisa dinamis dari session user nanti
      p_cart: cart, // Kirim state Zustand bulat-bulat
    });

    if (error) throw new Error(error.message);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
