"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  product_name: string;
  total_qty: number;
}

interface BottomProductsProps {
  bottom: Product[];
}

export function BottomProducts({ bottom }: BottomProductsProps) {
  return (
    <div className="px-10 space-y-4">
      <h1 className="text-md font-semibold">5 Produk Terbawah</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">No</TableHead>
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Qty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bottom.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-sm">{index + 1}</TableCell>
              <TableCell className="text-sm">{item.product_name}</TableCell>
              <TableCell className="text-sm">{item.total_qty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
