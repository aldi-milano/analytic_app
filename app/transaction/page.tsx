import { Suspense } from "react";
import { HistoryTransaction } from "../../components/transaction/history";

export default function Transaction() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HistoryTransaction />
    </Suspense>
  );
}
