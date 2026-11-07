import { Lightbulb, Rocket } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useProfitCategory } from "@/lib/hooks/use_profit_category";
import Collapsible from "./collapsible";

const chartConfig = {
  total_profit: {
    label: "Profit",
    color: "#059669",
  },
  total_omzet: {
    label: "Omzet",
    color: "#0284c7",
  },
} satisfies ChartConfig;

const formatCompactNumber = (value: any) => {
  // 1. Jika undefined (kosong), kembalikan string kosong
  if (value === undefined || value === null) return "";

  // 2. Ubah tipe data menjadi number (jaga-jaga jika Recharts melempar format string)
  const num = Number(value);

  // 3. Jika ternyata hasilnya bukan angka valid (NaN), kembalikan nilai aslinya
  if (isNaN(num)) return value.toString();

  // 4. Logika penyingkat angka
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + " Jt";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + " Rb";
  }
  return num.toString();
};

export function CategoryProfitChart() {
  const { data: chartsData, isLoading, isError } = useProfitCategory();
  return (
    <div>
      <CardHeader className="p-4 pb-2">
        <CardTitle>Margin Profit per Kategori</CardTitle>
        <CardDescription>September - November 2026</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          {/* 2. Tambahkan margin top agar angka di atas bar tidak terpotong oleh batas SVG */}
          <BarChart accessibilityLayer data={chartsData} margin={{ top: 40 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return value.replace("Kebutuhan", "Keb.");
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            {/* 3. Pindahkan ChartLegend ke DALAM BarChart */}
            <ChartLegend content={<ChartLegendContent />} />

            {/* 4. Sisipkan LabelList di dalam masing-masing Bar */}
            <Bar
              dataKey="total_omzet"
              fill={chartConfig.total_omzet.color}
              radius={4}
            >
              <LabelList
                dataKey="total_omzet"
                position="top"
                offset={10}
                className="fill-foreground"
                fontSize={10}
                formatter={formatCompactNumber}
              />
            </Bar>
            <Bar
              dataKey="total_profit"
              fill={chartConfig.total_profit.color}
              radius={4}
            >
              <LabelList
                dataKey="total_profit"
                position="top"
                offset={10}
                className="fill-foreground"
                fontSize={10}
                formatter={formatCompactNumber}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Collapsible title="Analisis & Rekomendasi">
          <div className="px-2 border rounded-md border-yellow-600 py-4 mb-2">
            <div className="flex flex-row gap-1 items-center mb-2">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
              <h2 className="text-sm font-semibold">Insight</h2>
            </div>
            <ul className="list-disc list-inside">
              <li className="text-sm mb-2">
                Omzet terbesar Kategori Keb. Rumah (13,6 Jt), namun profitnya
                tipis (hanya 1,3 Jt).
              </li>
              <li className="text-sm">
                Kategori Camilan dan Minuman sangat efisien. Meski omzetnya
                hanya separuh Keb. Rumah, profit keduanya memimpin (1,6 Jt & 1,5
                Jt).
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
                Buat promo paket. Gabungkan barang yang pasti dibeli
                (Sembako/Keb. Rumah) dengan barang untung besar
                (Camilan/Minuman) agar pembeli belanja lebih banyak.
              </li>
              <li className="text-sm">
                Sisihkan lebih banyak modal belanja bulan ini untuk memperbanyak
                variasi stok Camilan dan Minuman dingin.
              </li>
            </ul>
          </div>
        </Collapsible>
      </CardFooter>
    </div>
  );
}
