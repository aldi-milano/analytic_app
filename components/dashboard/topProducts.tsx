"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const top_5_barang = [
  {
    product_name: "Kopi Sachet",
    total_qty: 210,
  },
  {
    product_name: "Indomie Bawang",
    total_qty: 184,
  },
  {
    product_name: "Aqua",
    total_qty: 117,
  },
  {
    product_name: "Kecap",
    total_qty: 86,
  },
  {
    product_name: "Lays Potato",
    total_qty: 72,
  },
];

interface Product {
  product_name: string;
  total_qty: number;
}

interface TopProductsProps {
  top_5_barang: Product[];
}

export function TopProducts({ top_5_barang }: TopProductsProps) {
  return (
    <div className="px-14 space-y-4">
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
          {top_5_barang.map((item, index) => (
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
