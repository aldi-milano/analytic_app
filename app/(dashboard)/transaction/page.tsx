import { Suspense } from "react";
import { HistoryTransaction } from "../../../components/transaction/history";
import { TransactionSkeleton } from "@/components/shared/skeletonTransaction";

export default function Transaction() {
  return (
    <Suspense fallback={<TransactionSkeleton />}>
      <HistoryTransaction />
    </Suspense>
  );
}
