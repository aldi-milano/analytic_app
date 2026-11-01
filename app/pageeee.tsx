import Dashboard from "@/components/dashboard/dashboard";
import LoginPage from "@/components/login/login";
import { StokBarang } from "@/components/stok_barang/stokBarang";
import { HistoryTransaction } from "@/components/transaction/history";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="min-h-screen">
      {/* <Suspense>
        <Dashboard />
      </Suspense> */}
      {/* <LoginPage /> */}
    </main>
  );
}
