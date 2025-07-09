import { TrendingUp, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards({
  data,
}: {
  data: {
    totalSales: { value: number; status: string; message: string; percentage: number };
    newProducts: { value: number; status: string; message: string; percentage: number };
    growthRate: { value: number; status: string; message: string; percentage: number };
  };
}) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Penjualan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp. {data.totalSales.value > 0 ? data.totalSales.value.toLocaleString() : "0,00"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data.totalSales.status === "up" && (
                <>
                  <TrendingUp className="mr-1" />+{data.totalSales.percentage}%
                </>
              )}
              {data.totalSales.status === "down" && (
                <>
                  <TrendingDown className="mr-1" />-{data.totalSales.percentage}%
                </>
              )}
              {data.totalSales.status === "neutral" && (
                <>
                  <span className="mr-1">•</span>
                  Stabil
                </>
              )}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.totalSales.message === "up" && (
              <>
                Meningkat bulan ini <TrendingUp className="size-4" />
              </>
            )}
            {data.totalSales.message === "down" && (
              <>
                Menurun bulan ini <TrendingDown className="size-4" />
              </>
            )}
            {data.totalSales.status === "neutral" && (
              <>
                Stabil bulan ini <span className="text-xl leading-none">•</span>
              </>
            )}
          </div>
          <div className="text-muted-foreground">Data 3 bulan terakhir</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Produk Baru</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.newProducts.value > 0 ? data.newProducts.value : "0"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data.newProducts.status === "down" && (
                <>
                  <TrendingDown />-{data.newProducts.percentage}%
                </>
              )}
              {data.newProducts.status === "up" && (
                <>
                  <TrendingUp />+{data.newProducts.percentage}%
                </>
              )}
              {data.newProducts.status === "neutral" && (
                <>
                  <span className="mr-1">•</span>
                  Stabil
                </>
              )}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.newProducts.message === "up" && (
              <>
                Meningkat bulan ini <TrendingUp className="size-4" />
              </>
            )}
            {data.newProducts.message === "down" && (
              <>
                Menurun bulan ini <TrendingDown className="size-4" />
              </>
            )}
            {data.newProducts.status === "neutral" && (
              <>
                Stabil bulan ini <span className="text-xl leading-none">•</span>
              </>
            )}
          </div>
          <div className="text-muted-foreground">{data.newProducts.message}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tingkat Pertumbuhan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.growthRate.value > 0 ? data.growthRate.value : "0"}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data.growthRate.status === "down" && (
                <>
                  <TrendingDown />-{data.growthRate.percentage}%
                </>
              )}
              {data.growthRate.status === "up" && (
                <>
                  <TrendingUp />+{data.growthRate.percentage}%
                </>
              )}
              {data.growthRate.status === "neutral" && (
                <>
                  <span className="mr-1">•</span>
                  Stabil
                </>
              )}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.growthRate.message === "up" && (
              <>
                Meningkat bulan ini <TrendingUp className="size-4" />
              </>
            )}
            {data.growthRate.message === "down" && (
              <>
                Menurun bulan ini <TrendingDown className="size-4" />
              </>
            )}
            {data.growthRate.status === "neutral" && (
              <>
                Stabil bulan ini <span className="text-xl leading-none">•</span>
              </>
            )}
          </div>
          <div className="text-muted-foreground">{data.growthRate.message}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
