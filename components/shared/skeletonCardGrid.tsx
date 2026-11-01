import { Skeleton } from "@/components/ui/skeleton";

export function CardGridSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Skeleton className="py-2 p-3 h-25 bg-muted-foreground/10" />
        </div>
        <Skeleton className="py-2 p-3 h-25 bg-muted-foreground/10" />
        <Skeleton className="py-2 p-3 h-25 bg-muted-foreground/10" />
      </div>
    </div>
  );
}
