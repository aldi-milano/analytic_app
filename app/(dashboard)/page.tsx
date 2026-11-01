import { Suspense } from "react";
import Dashboard from "../../components/dashboard/dashboard";
import { CardGridSkeleton } from "@/components/shared/skeletonCardGrid";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-md min-h-screen">
      <Suspense fallback={<CardGridSkeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
