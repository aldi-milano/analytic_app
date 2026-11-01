import { Skeleton } from "@/components/ui/skeleton";

export function ClockSkeleton() {
  // Meniru bentuk Button variant="outline" shadcn
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="px-2.5 py-1 bg-muted-foreground/10 rounded-sm w-full" />
    </div>
  );
}
