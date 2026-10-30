import Dashboard from "@/components/dashboard/dashboard";
import DashboardHeader from "@/components/dashboard/dashboard_header";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="min-h-screen">
      <Suspense>
        <DashboardHeader />
        <Dashboard />
      </Suspense>
    </main>
  );
}
