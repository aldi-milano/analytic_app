import Dashboard from "@/components/dashboard/dashboard";
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
