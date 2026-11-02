"use  client";

import { logout } from "@/app/actions/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

export function AlertLogout() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    // Membungkus eksekusi server action agar UI tidak freeze
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <LogOut className="h-5 w-5 border-none" />
        {/* <span>Logout</span> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah yakin akan keluar?</AlertDialogTitle>
          <AlertDialogDescription>
            Sesi Anda akan berakhir. Anda harus masuk kembali untuk mengakses
            akun ini.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} disabled={isPending}>
            {isPending ? "Memproses..." : "Lanjutkan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
