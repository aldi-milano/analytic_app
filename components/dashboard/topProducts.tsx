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

interface TopProductsProps {
  top: Product[];
}

export function TopProducts({ top }: TopProductsProps) {
  return (
    <div className="px-16 space-y-4">
      <h1 className="text-xl font-semibold">Top 5 Products</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">No</TableHead>
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Qty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {top.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{item.product_name}</TableCell>
              <TableCell>{item.total_qty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
