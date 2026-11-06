"use client";

import { TrendingUp, Loader2, Lightbulb, Rocket } from "lucide-react";
import Collapsible from "./collapsible";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
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
} from "@/components/ui/chart";
import { useRevenue } from "@/lib/hooks/use_revenue";

const chartConfig = {
  total_transaksi: {
    label: "Total Transaksi",
    color: "#0EA5E9",
  },
} satisfies ChartConfig;

export function RevenueCharts() {
  const { data: revenue, isLoading } = useRevenue();

  // 1. Tambahkan status loading agar UI tidak render chart kosong saat data di-fetch
  if (isLoading) {
    return (
      <Card className="flex h-[350px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  // 2. Debugging: Pastikan data benar-benar sampai ke client component
  console.log("Data di Client:", revenue);

  return (
    <div>
      <CardHeader className="p-4 pb-2">
        <CardTitle>Tren Jumlah Transaksi</CardTitle>
        <CardDescription>September - November 2026</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        {revenue && revenue.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={revenue} // 3. Pastikan prop ini terisi 'revenue', bukan 'chartData'
              margin={{
                top: 30,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />

              {/* 4. YAxis ditambahkan (hide) untuk membantu kalkulasi skala garis otomatis */}
              <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />

              <XAxis
                dataKey="bulan"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="total_transaksi"
                type="natural"
                stroke="var(--color-total_transaksi)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-total_transaksi)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] items-center justify-center text-muted-foreground text-sm">
            Data tidak ditemukan atau gagal dimuat.
          </div>
        )}
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
                Volume transaksi menunjukkan tren penurunan 6,22% yang konsisten
                selama 3 bulan terakhir, menyusut dari 514 (September) menjadi
                482 (November).
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
                Evaluasi Stok & Harga: Segera cek apakah ada barang kebutuhan
                harian (paling laris) yang sering kosong akhir-akhir ini, atau
                apakah ada perubahan harga yang kalah saing dengan toko sekitar.
              </li>
              <li className="text-sm">
                Tarik Kembali Pelanggan: Terapkan promo bundling ringan (misal:
                beli beras + minyak dapat potongan harga) atau promo khusus
                akhir pekan untuk mendongkrak kembali trafik yang turun.
              </li>
            </ul>
          </div>
        </Collapsible>
      </CardFooter>
    </div>
  );
}
