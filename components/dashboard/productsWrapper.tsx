"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TopProducts } from "./topProducts";
import { BottomProducts } from "./bottomProducts";

interface Product {
  product_name: string;
  total_qty: number;
}

interface ProductsProps {
  top: Product[];
  bottom: Product[];
}

export function ProductsWrapper({ top, bottom }: ProductsProps) {
  return (
    <Carousel className="w-full mx-auto">
      <CarouselContent>
        <CarouselItem>
          <div>
            <TopProducts top={top} />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div>
            <BottomProducts bottom={bottom} />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
