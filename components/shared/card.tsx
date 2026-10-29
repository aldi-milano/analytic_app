import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

// Mapping style preset agar aman dari purging Tailwind
const variantStyles = {
  blue: {
    bg: "bg-sky-50/60 border-sky-100",
    textTitle: "text-sky-700",
    textValue: "text-sky-950",
    textSub: "text-sky-600",
    iconBg: "bg-sky-100 text-sky-600",
  },
  emerald: {
    bg: "bg-emerald-50/60 border-emerald-100",
    textTitle: "text-emerald-700",
    textValue: "text-emerald-950",
    textSub: "text-emerald-600",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
  rose: {
    bg: "bg-rose-50/60 border-rose-100",
    textTitle: "text-rose-700",
    textValue: "text-rose-950",
    textSub: "text-rose-600",
    iconBg: "bg-rose-100 text-rose-600",
  },
};

interface StatCardProps {
  title: string;
  amount: number;
  subtitle?: string;
  icon: LucideIcon; // Menerima komponen Icon dari Lucide
  variant?: "blue" | "emerald" | "rose";
  className?: string;
  size?: "normal" | "lg";
}

export function StatCard({
  title,
  amount,
  subtitle,
  icon: Icon, // Rename ke 'Icon' dengan huruf kapital agar bisa dirender sebagai elemen JSX
  variant = "blue",
  className,
  size = "normal", // Default size
}: StatCardProps) {
  const style = variantStyles[variant];

  const isLarge = size === "lg";
  const titleSize = isLarge ? "text-base font-semibold" : "text-sm font-medium";
  const amountSize = isLarge ? "text-2xl font-bold" : "text-lg font-bold";
  const subSize = isLarge ? "text-xs" : "text-[10px]";

  return (
    <Card className={style.bg}>
      <CardContent className="py-2 p-3">
        <div className="flex items-center justify-between">
          <span className={`${titleSize} ${style.textTitle}`}>{title}</span>
          <div className={`rounded-full p-1.5 ${style.iconBg}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <p className={`${amountSize} ${style.textValue}`}>
          Rp {amount.toLocaleString("id-ID")}
        </p>
        {subtitle && (
          <span className={`${subSize} ${style.textSub}`}>{subtitle}</span>
        )}
      </CardContent>
    </Card>
  );
}
