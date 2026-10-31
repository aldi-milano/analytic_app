import { Suspense } from "react";
import { HistoryTransaction } from "../../components/transaction/history";

export default function Transaction() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HistoryTransaction />
    </Suspense>
  );
}
