"use client";
import { useWaktuTransaksi } from "@/lib/hooks/use_waktuTransaksi";

import { Pie, PieChart } from "recharts";
import { Lightbulb, Rocket } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend, // Pastikan ini di-import
  ChartLegendContent, // Pastikan ini di-import
} from "@/components/ui/chart";
import Collapsible from "./collapsible";

const chartConfig = {
  pagi: {
    label: "Pagi",
    color: "#F59E0B", // High contrast warna yang bagus untuk aksesibilitas
  },
  siang: {
    label: "Siang",
    color: "#0EA5E9",
  },
  malam: {
    label: "Malam",
    color: "#4F46E5",
  },
} satisfies ChartConfig;

export function WaktuTransaksi() {
  const { data } = useWaktuTransaksi();

  return (
    <div>
      <CardHeader className="p-4 pb-2">
        <CardTitle>Distribusi Waktu Transaksi</CardTitle>
        <CardDescription>September - November 2026</CardDescription>
      </CardHeader>

      <CardContent className="p-2 pt-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]" // Dinaikkan ke 300px agar Legend memiliki ruang dan tidak terpotong
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="total"
              nameKey="waktu"
              innerRadius={60} // innerRadius membuat efek 'Donut'
              outerRadius={90}
              labelLine={false} // Dihilangkan agar UI mobile tetap bersih tanpa garis kusut
              label={({ percent = 0 }) => {
                // Return angka persen saja (contoh: "45%")
                return percent > 0 ? `${(percent * 100).toFixed(0)}%` : null;
              }}
            />
            {/* Legend untuk memunculkan label warna di bawah chart */}
            <ChartLegend
              content={<ChartLegendContent nameKey="waktu" />}
              className="-translate-y-2 flex-wrap gap-2"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Collapsible title="Analisis & Rekomendasi">
          <div className="px-2 border rounded-md border-yellow-600 py-4 mb-2">
            <div className="flex flex-row gap-1 items-center mb-2">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
              <h2 className="text-sm font-semibold">Insight</h2>
            </div>
            <ul className="list-disc list-inside">
              <li className="text-sm mb-2">
                Pagi hari mendominasi hampir separuh transaksi (49%).
              </li>
            </ul>
          </div>
          <div className="px-2 border rounded-md border-emerald-600 py-4">
            <div className="flex flex-row gap-1 items-center mb-2">
              <Rocket className="h-4 w-4 text-emerald-600" />
              <h2 className="text-sm font-semibold">Rekomendasi</h2>
            </div>
            <ul className="list-disc list-inside">
              <li className="text-sm mb-2">
                Pastikan rak barang harian sudah diisi ulang sejak malam agar
                toko siap menghadapi lonjakan pembeli.
              </li>
            </ul>
          </div>
        </Collapsible>
      </CardFooter>
    </div>
  );
}
