"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  GetProfitByCategory,
  CategoryProfit,
} from "../supabase/get_profit_category";

export function useProfitCategory() {
  const { data, isPending, isError, isLoading, error } = useQuery({
    queryKey: ["profit-category"],
    queryFn: async () => {
      const res = await GetProfitByCategory();
      return res;
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
