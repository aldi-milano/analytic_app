"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetRevenue, TypeRevenue } from "../supabase/getRevenue";

export function useRevenue() {
  const { data, isPending, isError, isLoading, error } = useQuery<
    TypeRevenue[]
  >({
    queryKey: ["revenue-transaksi"],
    queryFn: async () => {
      const res = await GetRevenue();
      return (res as TypeRevenue[]) || [];
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
    enabled: typeof window !== "undefined",
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error,
  };
}
