import { create } from "zustand";

export type CartItem = {
  id_produk: string;
  nama_produk: string;
  kategori: string;
  qty: number;
  harga: number; // Harga yang jadi acuan subtotal (Jual/Beli)
  harga_beli: number;
  harga_jual: number;
  jumlah: number;
};

interface TransaksiStore {
  cart: CartItem[];
  tipeTransaksi: "penjualan" | "pembelian";
  setTipeTransaksi: (tipe: "penjualan" | "pembelian") => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id_produk: string) => void; // Fungsi hapus dari tabel
  clearCart: () => void;
  getTotal: () => number;
}

export const useTransaksiStore = create<TransaksiStore>((set, get) => ({
  cart: [],
  tipeTransaksi: "penjualan",
  setTipeTransaksi: (tipe) => set({ tipeTransaksi: tipe, cart: [] }), // Reset cart jika pindah mode
  addToCart: (item) => {
    const existing = get().cart.find((c) => c.id_produk === item.id_produk);
    if (existing) {
      // Jika barang sudah ada di keranjang, tambahkan qty-nya saja
      set((state) => ({
        cart: state.cart.map((c) =>
          c.id_produk === item.id_produk
            ? {
                ...c,
                qty: c.qty + item.qty,
                jumlah: (c.qty + item.qty) * c.harga,
              }
            : c,
        ),
      }));
    } else {
      set((state) => ({ cart: [...state.cart, item] }));
    }
  },
  removeFromCart: (id_produk) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id_produk !== id_produk),
    })),
  clearCart: () => set({ cart: [] }),
  getTotal: () => get().cart.reduce((total, item) => total + item.jumlah, 0),
}));
