"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import { UseTransaction } from "@/lib/hooks/use_transaction";

export function HistoryTransaction() {
  const { data, isLoading } = UseTransaction();
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        {/* <LoaderIcon className="w-4 h-4 mr-2 animate-spin" /> */}
        <LoaderIcon className={cn("size-4 animate-spin")} />
      </div>
    );
  }
  return (
    <div>
      {(data || []).map((res, i) => (
        <div key={i} className="p-4 pb-4">
          <div className="flex justify-end mb-4 gap-1">
            <p className="text-[10px] text-slate-500">{res.transaction_id}</p>
            <Separator orientation="vertical" />
            <p className="text-[10px] text-slate-500">{res.payment_method}</p>
            <Separator orientation="vertical" />
            <p className="text-[10px] text-slate-500">{res.timestamp}</p>
            <Separator orientation="vertical" />
            <p className="text-[10px] text-slate-500">{res.cashier_shift}</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm text-left">No</TableHead>
                <TableHead className="text-sm text-left">Log</TableHead>
                <TableHead className="text-sm text-center">Item</TableHead>
                <TableHead className="text-sm text-center">Quantity</TableHead>
                <TableHead className="text-sm text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {res.items.map((item, id) => (
                <TableRow key={id} className="even:bg-zinc-200/60">
                  <TableCell>{id + 1}</TableCell>
                  <TableCell>{item.transaction_log}</TableCell>
                  <TableCell className="text-sm text-center">
                    {item.product_name}
                  </TableCell>
                  <TableCell className="text-sm text-center">
                    {item.qty}
                  </TableCell>
                  <TableCell className="text-sm text-right">
                    {item.amount.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">
                  Rp {res.total.toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Separator className="mt-4" />
        </div>
      ))}
      <div className="p-4"></div>
    </div>
  );
}
