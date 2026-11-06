import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryProfitChart } from "./profit_margin";
import { WaktuTransaksi } from "./jamPelanggan";
import { RevenueCharts } from "./revenue";

interface Product {
  product_name: string;
  total_qty: number;
}

interface ProductsProps {
  top: Product[];
  bottom: Product[];
}

export function CarouselCharts() {
  return (
    <Carousel className="w-full mx-auto">
      <CarouselContent>
        <CarouselItem>
          <div>
            <CategoryProfitChart />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            <WaktuTransaksi />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            <RevenueCharts />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
