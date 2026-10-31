"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchTransaction, FilterRange } from "../supabase/get_transaction";

// Interface untuk type safety
export interface TransactionItem {
  transaction_log: string;
  product_name: string;
  qty: number;
  amount: number;
}

export interface TransactionHistory {
  transaction_id: string;
  payment_method: string;
  cashier_shift: string;
  timestamp: string;
  total: number;
  items: TransactionItem[];
}

export function UseTransaction() {
  const searchParams = useSearchParams();
  const currentFilter =
    (searchParams.get("filter_period") as FilterRange) || "day";

  const { data, isPending, isError } = useQuery<TransactionHistory[]>({
    queryKey: ["transaction", currentFilter],
    queryFn: async () => {
      const res = await fetchTransaction(currentFilter);
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
  });

  return {
    filter: currentFilter,
    data: data,
    isLoading: isPending,
    isError: isError,
  };
}
