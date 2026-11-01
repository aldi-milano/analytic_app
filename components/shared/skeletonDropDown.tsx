import { Skeleton } from "@/components/ui/skeleton";

export function DropDownSkeleton() {
  // Meniru bentuk Button variant="outline" shadcn
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-4 w-16 bg-muted-foreground/10 rounded-sm" />
    </div>
  );
}
