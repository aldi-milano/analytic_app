import Dashboard from "@/components/dashboard/dashboard";
import DashboardHeader from "@/components/dashboard/dashboard_header";
import { MobileNav } from "@/components/shared/mobile_nav";
import { HistoryTransaction } from "@/components/transaction/history";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Dashboard />
      </Suspense>
    </main>
  );
}
