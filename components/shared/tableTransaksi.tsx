// "use client";

// import { LoaderIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useStokBarang, StokInformasi } from "@/lib/hooks/use_stok";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export function TabelTransaksi() {
//   const { data, isLoading } = useStokBarang();
//   console.log(data);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center w-full h-screen">
//         <LoaderIcon className={cn("size-4 animate-spin")} />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Table>
//         <TableHeader className="sticky top-0 z-10">
//           <TableRow>
//             <TableHead className="text-sm text-left">No</TableHead>
//             <TableHead className="text-sm text-left">ID Produk</TableHead>
//             <TableHead className="text-sm text-center">Produk</TableHead>
//             <TableHead className="text-sm text-center">Qty</TableHead>
//             <TableHead className="text-sm text-right">Jumlah</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           <TableRow className="even:bg-zinc-200/60">
//             <TableCell>1</TableCell>
//             <TableCell>1234HAHA</TableCell>
//             <TableCell className="text-sm text-center">Kopi ABC Susu</TableCell>
//             <TableCell className="text-sm text-center">2</TableCell>
//             <TableCell className="text-sm text-right">4000</TableCell>
//           </TableRow>
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableCell colSpan={4}>Total</TableCell>
//             <TableCell className="text-right">Rp 4000</TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </div>
//   );
// }

import { useTransaksiStore } from "@/lib/store/useTransaksiStore";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function TabelTransaksi() {
  const { cart, getTotal, removeFromCart } = useTransaksiStore();
  const totalTransaksi = getTotal();

  return (
    <Table className="mb-5 border rounded-md">
      <TableHeader className="sticky top-0 z-10 bg-zinc-50">
        <TableRow>
          <TableHead className="text-sm text-left">ID</TableHead>
          <TableHead className="text-sm text-left">Produk</TableHead>
          <TableHead className="text-sm text-center">Qty</TableHead>
          <TableHead className="text-sm text-right">Harga</TableHead>
          <TableHead className="text-sm text-right">Subtotal</TableHead>
          <TableHead className="text-sm text-center">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground py-5"
            >
              Belum ada barang di transaksi.
            </TableCell>
          </TableRow>
        ) : (
          cart.map((item, index) => (
            <TableRow key={index} className="even:bg-zinc-100/50">
              <TableCell>{item.id_produk}</TableCell>
              <TableCell className="text-sm text-left font-medium">
                {item.nama_produk}
              </TableCell>
              <TableCell className="text-sm text-center">{item.qty}</TableCell>
              <TableCell className="text-sm text-right">
                Rp {item.harga.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-sm text-right">
                Rp {item.jumlah.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-sm text-center">
                {/* Tombol Hapus */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => removeFromCart(item.id_produk)}
                >
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-zinc-100">
          <TableCell colSpan={4} className="font-semibold text-right">
            Total Transaksi
          </TableCell>
          <TableCell className="text-right font-bold text-lg text-primary">
            Rp {totalTransaksi.toLocaleString("id-ID")}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
