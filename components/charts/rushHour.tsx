"use client";

import { useRushHour } from "@/lib/hooks/use_rushHour";
import { FilterRange } from "@/lib/supabase/getRushHour";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  pagi: {
    label: "Pagi",
    color: "#F59E0B", // Pastikan warna CSS variabel Anda benar
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

export function RushHour() {
  const { data, isLoading, isError, error, range, setRange } = useRushHour(7);

  if (isError) {
    return <p className="text-red-500">Gagal memuat data: {error?.message}</p>;
  }

  return (
    <div>
      <CardHeader className="flex flex-col items-start gap-4 space-y-0 p-4 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-md">Jam Ramai Pelanggan</CardTitle>
          <CardDescription className="text-sm">
            Perbandingan transaksi pada Pagi, Siang dan Malam
          </CardDescription>
        </div>
        <Select
          value={String(range)}
          onValueChange={(val) => setRange(Number(val) as FilterRange)}
        >
          <SelectTrigger
            className="rounded-md sm:ml-auto sm:flex text-xs"
            aria-label="Pilih rentang waktu"
          >
            <SelectValue placeholder="Pilih Periode" />
          </SelectTrigger>
          <SelectContent className="rounded-md">
            <SelectItem value={"7"} className="rounded-md text-xs">
              7 Hari Terakhir
            </SelectItem>
            <SelectItem value={"30"} className="rounded-md text-xs">
              30 Hari Terakhir
            </SelectItem>
            <SelectItem value={"90"} className="rounded-md text-xs">
              90 Hari Terakhir
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-2">
        {/* Loading state sederhana agar tidak error saat data ditarik */}
        {isLoading ? (
          <div className="flex h-[250px] w-full items-center justify-center text-muted-foreground">
            Memuat data chart...
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={data}>
              <defs>
                {/* Gradient untuk Pagi */}
                <linearGradient id="fillPagi" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-pagi)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-pagi)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                {/* Gradient untuk Siang */}
                <linearGradient id="fillSiang" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-siang)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-siang)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                {/* Gradient untuk Malam */}
                <linearGradient id="fillMalam" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-malam)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-malam)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />

              {/* UBAH: dataKey dari 'date' menjadi 'tgl' sesuai output RPC Supabase */}
              <XAxis
                dataKey="tgl"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={10}
                interval="preserveStartEnd"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("id-ID", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("id-ID", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />

              {/* UBAH: 3 Area untuk masing-masing kategori waktu (Malam, Siang, Pagi) */}

              <Area
                dataKey="pagi"
                type="natural"
                fill="url(#fillPagi)"
                stroke="var(--color-pagi)"
              />
              <Area
                dataKey="siang"
                type="natural"
                fill="url(#fillSiang)"
                stroke="var(--color-siang)"
              />
              <Area
                dataKey="malam"
                type="natural"
                fill="url(#fillMalam)"
                stroke="var(--color-malam)"
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </div>
  );
}
