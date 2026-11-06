"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetRushHour, FilterRange } from "../supabase/getRushHour";
import { GetWaktuTransaksi } from "../supabase/waktuTransaksi";

export interface WaktuTransaksi {
  waktu: string;
  total: number;
  fill: string;
}

export function useWaktuTransaksi() {
  const { data, isPending, isError, isLoading, error } = useQuery<
    WaktuTransaksi[]
  >({
    queryKey: ["waktuTransaksi"],
    queryFn: async () => {
      const res = await GetWaktuTransaksi();

      if (res.error) {
        // Tambahkan 'as any' agar TypeScript tidak protes mencari '.message'
        throw new Error((res.error as any).message || "Gagal mengambil data");
      }

      // Ambil res.data-nya, bukan res-nya
      return (res.data as WaktuTransaksi[]) || [];
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
    enabled: typeof window !== "undefined",
  });

  return {
    data: data || [],
    isLoading,
    isPending,
    isError,
    error,
  };
}
