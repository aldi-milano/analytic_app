import { Suspense } from "react";
import Dashboard from "@/components/dashboard/dashboard";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-md min-h-screen">
      <Suspense fallback={<p>Loading...</p>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
