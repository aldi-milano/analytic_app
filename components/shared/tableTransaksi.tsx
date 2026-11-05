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
          <TableHead className="text-sm text-left">No</TableHead>
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
            <TableRow key={index} className="even:bg-zinc-200/60">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.id_produk}</TableCell>
              <TableCell className="text-sm text-left font-medium">
                {item.nama_produk}
              </TableCell>
              <TableCell className="text-sm text-center">{item.qty}</TableCell>
              <TableCell className="text-sm text-right">
                {item.harga.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-sm text-right">
                {item.jumlah.toLocaleString("id-ID")}
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
          <TableCell colSpan={5} className="font-semibold text-right">
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
