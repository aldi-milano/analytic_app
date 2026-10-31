"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetStok } from "../supabase/getStokBarang";

export interface StokInformasi {
  kategori: string;
  id_produk: string;
  stok_awal: number;
  harga_beli: number;
  harga_jual: number;
  stok_akhir: number;
  nama_produk: string;
}

const DEFAULT_STOK_INFORMASI: StokInformasi = {
  kategori: "",
  id_produk: "",
  stok_awal: 0,
  stok_akhir: 0,
  harga_beli: 0,
  harga_jual: 0,
  nama_produk: "",
};

export function useStokBarang() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["items"],
    // queryFn: () => GetStok(),
    queryFn: async () => {
      const res = await GetStok();
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
    enabled: typeof window !== "undefined",
  });

  return {
    data: data || [],
    isLoading: isPending,
    isError: isError,
  };
}
