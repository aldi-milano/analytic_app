"use client";

import { useStokBarang, StokInformasi } from "@/lib/hooks/use_stok";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AlertTriangleIcon, AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Notification() {
  const { data: stokBarang, isLoading } = useStokBarang();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoaderIcon className={cn("size-4 animate-spin")} />
      </div>
    );
  }

  const lowStockItems = stokBarang.filter(
    (item: StokInformasi) => item.stok_akhir <= item.rekomendasi_qty_stok,
  );

  return (
    <>
      {lowStockItems.map((item: StokInformasi, i: number) => {
        const isOutOfStock = item.stok_akhir === 0;

        const config = {
          className: isOutOfStock
            ? "max-w-md border-rose-200 bg-rose-50 text-rose-900"
            : "max-w-md border-amber-200 bg-amber-50 text-amber-900",
          icon: isOutOfStock ? <AlertTriangleIcon /> : <AlertCircleIcon />,
          title: isOutOfStock ? "Habis" : "Menipis",
          description: isOutOfStock
            ? `Produk ${item.nama_produk} telah habis, segera stok ulang.`
            : `Produk ${item.nama_produk} akan habis dalam 
              ${Math.ceil(item.stok_akhir / item.avg_qty)} hari`,
        };

        return (
          <div key={i} className="mb-1">
            <Alert className={config.className}>
              {config.icon}
              <AlertTitle>
                Stok {item.nama_produk} {config.title}
              </AlertTitle>
              <AlertDescription>{config.description}</AlertDescription>
            </Alert>
          </div>
        );
      })}
    </>
  );
}

// const isOutOfStock = item.stok_akhir === 0;

// const config = {
//   className: isOutOfStock
//     ? "max-w-md border-rose-200 bg-rose-50 text-rose-900"
//     : "max-w-md border-amber-200 bg-amber-50 text-amber-900",
//   icon: isOutOfStock ? <AlertTriangleIcon /> : <AlertCircleIcon />,
//   title: isOutOfStock ? "Stok Habis" : "Stok Tipis",
//   description: isOutOfStock
//     ? `${item.nama_produk} is out of stock.`
//     : `${item.nama_produk} is running low on stock.`,

{
  /* <div>
  <Alert key={i} className={config.className}>
    {config.icon}
    <AlertTitle>
      {item.nama_produk} {isOutOfStock ? "Stok Habis" : "Stok Tipis"}
    </AlertTitle>
    <AlertDescription>
      {item.nama_produk}{" "}
      {isOutOfStock ? "is out of stock." : "is running low on stock."}
    </AlertDescription>
  </Alert>
</div> */
}
