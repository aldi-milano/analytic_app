"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetRushHour, FilterRange } from "../supabase/getRushHour";
import { useState } from "react";

export interface PeriodCharts {
  tgl: string;
  pagi: number;
  malam: number;
  siang: number;
}

const DEFAULT_STOK_INFORMASI: PeriodCharts = {
  tgl: "",
  pagi: 0,
  malam: 0,
  siang: 0,
};

export function useRushHour(initialRange: FilterRange = 7) {
  const [range, setRange] = useState<FilterRange>(initialRange);
  const { data, isPending, isError, isLoading, error } = useQuery({
    queryKey: ["rushHour", range],
    queryFn: async () => {
      const res = await GetRushHour(range);
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
    isLoading,
    isError,
    error,
    range,
    setRange,
  };
}
