"use client";

import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStokBarang, StokInformasi } from "@/lib/hooks/use_stok";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function StokBarang() {
  const { data, isLoading } = useStokBarang();
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoaderIcon className={cn("size-4 animate-spin")} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Produk</TableHead>
            <TableHead>Nama Produk</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Harga Beli</TableHead>
            <TableHead>Harga Jual</TableHead>
            <TableHead>Jumlah Stok</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: StokInformasi, i: number) => (
            <TableRow key={i} className="even:bg-zinc-200/60">
              <TableCell>{item.id_produk}</TableCell>
              <TableCell>{item.nama_produk}</TableCell>
              <TableCell>{item.kategori}</TableCell>
              <TableCell>{item.harga_beli}</TableCell>
              <TableCell>{item.harga_jual}</TableCell>
              <TableCell>{item.stok_akhir}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
