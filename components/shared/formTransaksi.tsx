"use client";

import { useState, useEffect, useCallback } from "react";
import { useStokBarang } from "@/lib/hooks/use_stok";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useTransaksiStore } from "@/lib/store/useTransaksiStore"; // Import Zustand
import TabelTransaksi from "./tableTransaksi";
import { InsertTransaksi } from "@/lib/actions/transaksi";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FormTransaksi() {
  const [idProduk, setIdProduk] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [kategori, setKategori] = useState("Umum");
  const [hargaBeli, setHargaBeli] = useState(0);
  const [hargaJual, setHargaJual] = useState(0);
  const [qty, setQty] = useState(1);

  // Subtotal dinamis
  const hargaAcuan = tipeTransaksi === "penjualan" ? hargaJual : hargaBeli;
  const jumlah = qty * hargaAcuan;

  // PERBAIKAN 2: Buat fungsi khusus untuk reset form input
  const resetForm = useCallback(() => {
    setIdProduk("");
    setNamaProduk("");
    setKategori("Umum");
    setHargaBeli(0);
    setHargaJual(0);
    setQty(1);
  }, []);

  // PERBAIKAN 2: Panggil resetForm saat masuk (mount) dan keluar page (unmount)
  useEffect(() => {
    resetForm(); // Pastikan bersih saat pertama buka page

    return () => {
      clearCart();
      resetForm(); // Bersihkan sisa ketikan saat pindah page
    };
  }, [clearCart, resetForm]);

  // Fungsi pengisi data (Autofill)
  // const autofillFields = (foundItem: any) => {
  //   if (foundItem) {
  //     setIdProduk(foundItem.id_produk); // PERBAIKAN 1: Tambahkan ini agar ID ikut ter-autofill
  //     setNamaProduk(foundItem.nama_produk);
  //     setKategori(foundItem.kategori);
  //     setHargaBeli(foundItem.harga_beli);
  //     setHargaJual(foundItem.harga_jual);
  //   } else {
  //     if (tipeTransaksi === "penjualan") {
  //       setNamaProduk(""); 
  //       setKategori("Umum");
  //       setHargaBeli(0);
  //       setHargaJual(0);
  //     }
  //   }
  // };

  // 1. Handler Jika ID diketik duluan
  const handleIdChange = (val: string) => {
    setIdProduk(val);
    const foundItem = stokData?.find((item: any) => item.id_produk === val);

    if (foundItem) {
      setNamaProduk(foundItem.nama_produk);
      setKategori(foundItem.kategori);
      setHargaBeli(foundItem.harga_beli);
      setHargaJual(foundItem.harga_jual);
    } else {
      // Kosongkan yang lain jika ID tidak valid/dihapus
      setNamaProduk("");
      setKategori("Umum");
      setHargaBeli(0);
      setHargaJual(0);
    }
  };

  // 2. Handler Jika Nama Produk diketik duluan
  const handleNamaChange = (val: string) => {
    setNamaProduk(val); // Biarkan user mengetik namanya
    
    // Cari barang berdasarkan nama yang persis sama
    const foundItem = stokData?.find(
      (item: any) => item.nama_produk.toLowerCase() === val.toLowerCase()
    );

    if (foundItem) {
      setIdProduk(foundItem.id_produk); // <--- Ini yang akan mengisi ID
      setKategori(foundItem.kategori);
      setHargaBeli(foundItem.harga_beli);
      setHargaJual(foundItem.harga_jual);
    } else {
      // Kosongkan ID dan lainnya selama nama belum cocok persis dengan database
      setIdProduk("");
      setKategori("Umum");
      setHargaBeli(0);
      setHargaJual(0);
    }
  };

  const handleIdChange = (val: string) => {
    setIdProduk(val);
    autofillFields(stokData?.find((item: any) => item.id_produk === val));
  };

  const handleNamaChange = (val: string) => {
    setNamaProduk(val);
    autofillFields(
      stokData?.find(
        (item: any) => item.nama_produk.toLowerCase() === val.toLowerCase(),
      ),
    );
  };

  const incrementQty = () => setQty((prev) => prev + 1);
  const decrementQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddKeTabel = () => {
    if (!idProduk || !namaProduk || qty < 1 || hargaAcuan === 0)
      return alert("Data barang / harga tidak valid!");

    if (tipeTransaksi === "penjualan") {
      const selectedItem = stokData?.find(
        (item: any) => item.id_produk === idProduk,
      );

      if (selectedItem && selectedItem.stok_akhir === 0) {
        return alert("Stok barang kosong! Tidak bisa melakukan penjualan.");
      }

      if (selectedItem && qty > selectedItem.stok_akhir) {
        return alert(
          `Stok tidak mencukupi! Sisa stok hanya: ${selectedItem.stok_akhir}`,
        );
      }
    }

    addToCart({
      id_produk: idProduk,
      nama_produk: namaProduk,
      kategori,
      qty,
      harga: hargaAcuan,
      harga_beli: hargaBeli,
      harga_jual: hargaJual,
      jumlah,
    });

    // Gunakan resetForm di sini agar lebih bersih dan tidak berulang
    resetForm(); 
  };

  const simpanTransaksiMutation = useMutation({
    mutationFn: async () => {
      const res = await InsertTransaksi(cart, tipeTransaksi);
      if (!res.success) throw new Error(res.error);
      return res;
    },
    onSuccess: () => {
      alert("Transaksi Berhasil Disimpan!");
      clearCart();
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => alert(error.message),
  });

  return (
    <div id="bug-report-form" className="mt-8">
      <div className="mb-5 flex gap-6">
        <label className="flex items-center gap-2 font-medium">
          <input
            type="radio"
            checked={tipeTransaksi === "penjualan"}
            onChange={() => setTipeTransaksi("penjualan")}
          />{" "}
          Penjualan
        </label>
        <label className="flex items-center gap-2 font-medium">
          <input
            type="radio"
            checked={tipeTransaksi === "pembelian"}
            onChange={() => setTipeTransaksi("pembelian")}
          />{" "}
          Pembelian
        </label>
      </div>

      <div className="mb-6 bg-zinc-50/50 p-5 rounded-lg border shadow-sm flex flex-col gap-4">
        {/* ROW 1: ID & Nama Produk */}
        <div className="flex flex-row gap-4">
          <Field className="flex-1">
            <FieldLabel>ID</FieldLabel>
            <Input
              className="placeholder: text-sm"
              list="list-id"
              value={idProduk}
              onChange={(e) => handleIdChange(e.target.value)}
              placeholder="Scan ID..."
            />
            <datalist id="list-id">
              {!isLoading &&
                stokData?.map((item: any) => (
                  <option key={item.id_produk} value={item.id_produk}>
                    {item.nama_produk}
                  </option>
                ))}
            </datalist>
          </Field>
          <Field className="flex-1">
            <FieldLabel>Produk</FieldLabel>
            <Input
              className="placeholder: text-sm"
              list="list-nama"
              value={namaProduk}
              onChange={(e) => handleNamaChange(e.target.value)}
              placeholder="Kopi ABC"
            />
            <datalist id="list-nama">
              {!isLoading &&
                stokData?.map((item: any) => (
                  <option key={item.id_produk} value={item.nama_produk}>
                    {item.id_produk}
                  </option>
                ))}
            </datalist>
          </Field>
        </div>

        {/* ROW 2 (Khusus Pembelian): Kategori & Harga Bebas Edit */}
        {tipeTransaksi === "pembelian" && (
          <div className="flex flex-row gap-4 bg-blue-50/50 p-3 rounded border border-blue-100">
            <Field className="flex-1">
              <FieldLabel>Kategori</FieldLabel>
              <Input
                className="placeholder: text-sm"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                placeholder="Cth: Minuman"
              />
            </Field>
            <Field className="flex-1">
              <FieldLabel>Harga Beli</FieldLabel>
              <Input
                type="number"
                value={hargaBeli}
                onChange={(e) => setHargaBeli(Number(e.target.value))}
              />
            </Field>
            <Field className="flex-1">
              <FieldLabel>Harga Jual</FieldLabel>
              <Input
                type="number"
                value={hargaJual}
                onChange={(e) => setHargaJual(Number(e.target.value))}
              />
            </Field>
          </div>
        )}

        {/* ROW 3: Qty Plus Minus & Subtotal */}
        <div className="flex flex-row gap-4 items-end">
          <Field className="flex-1">
            <FieldLabel>Qty</FieldLabel>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                onClick={decrementQty}
                variant="outline"
                className="px-3"
              >
                -
              </Button>
              <Input
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-16 text-center"
              />
              <Button
                type="button"
                onClick={incrementQty}
                variant="outline"
                className="px-3"
              >
                +
              </Button>
            </div>
          </Field>

          <Field className="flex-1">
            <FieldLabel>Subtotal (Rp)</FieldLabel>
            <Input
              type="text"
              value={jumlah.toLocaleString("id-ID")}
              readOnly
              className="bg-zinc-100 font-semibold"
            />
          </Field>
        </div>
        <Button
          type="button"
          onClick={handleAddKeTabel}
          variant="secondary"
          className="px-8 h-10 bg-black text-white hover:bg-black/80"
        >
          Tambah ke Tabel
        </Button>
      </div>

      <TabelTransaksi />

      <Button
        onClick={() => simpanTransaksiMutation.mutate()}
        className="w-full mt-4 h-10"
        size="lg"
        disabled={simpanTransaksiMutation.isPending || cart.length === 0}
      >
        {simpanTransaksiMutation.isPending
          ? "Memproses Transaksi..."
          : "Simpan Transaksi"}
      </Button>
    </div>
  );
}
