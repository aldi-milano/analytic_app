import { Skeleton } from "@/components/ui/skeleton";

export function TransactionSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-10 w-full bg-muted-foreground/10 rounded-sm" />
      <Skeleton className="h-40 w-full bg-muted-foreground/10 rounded-sm" />
    </div>
  );
}
