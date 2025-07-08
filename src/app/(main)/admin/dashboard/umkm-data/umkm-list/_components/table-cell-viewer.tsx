import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

import { sectionSchema } from "./schema";

const chartData = [
  { month: "April", desktop: 178 },
  { month: "April", desktop: 167 },
  { month: "May", desktop: 142 },
  { month: "June", desktop: 156 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function TableCellViewer({ item }: { item: z.infer<typeof sectionSchema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit cursor-pointer px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>Menampilkan deskripsi produk</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">Deskripsi Produk</div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just some random text to test the layout. It
                  spans multiple lines and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <Tabs defaultValue="hpp" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hpp">HPP</TabsTrigger>
              <TabsTrigger value="bep">BEP</TabsTrigger>
            </TabsList>

            <TabsContent value="hpp">
              <div className="flex flex-col gap-4">
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-semibold">Harga Pokok Penjualan (HPP)</h3>
                  <p className="text-muted-foreground text-sm">Hitung biaya produksi per unit</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="bahan-baku">Biaya Bahan Baku</Label>
                    <Input id="bahan-baku" type="number" placeholder="Rp 0" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="tenaga-kerja">Biaya Tenaga Kerja</Label>
                    <Input id="tenaga-kerja" type="number" placeholder="Rp 0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="overhead">Biaya Overhead</Label>
                    <Input id="overhead" type="number" placeholder="Rp 0" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="jumlah-unit">Jumlah Unit Produksi</Label>
                    <Input id="jumlah-unit" type="number" placeholder="0" />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="biaya-lain">Biaya Lain-lain</Label>
                  <Input id="biaya-lain" type="number" placeholder="Rp 0" />
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <div className="mb-2 text-sm font-medium">Hasil Perhitungan HPP:</div>
                  <div className="text-2xl font-bold">Rp 0 / unit</div>
                  <div className="text-muted-foreground text-sm">Total Biaya Produksi ÷ Jumlah Unit</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bep">
              <div className="flex flex-col gap-4">
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-semibold">Break Even Point (BEP)</h3>
                  <p className="text-muted-foreground text-sm">Hitung titik impas penjualan</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="biaya-tetap">Biaya Tetap</Label>
                    <Input id="biaya-tetap" type="number" placeholder="Rp 0" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="harga-jual">Harga Jual per Unit</Label>
                    <Input id="harga-jual" type="number" placeholder="Rp 0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="biaya-variabel">Biaya Variabel per Unit</Label>
                    <Input id="biaya-variabel" type="number" placeholder="Rp 0" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="margin-keuntungan">Margin Keuntungan (%)</Label>
                    <Input id="margin-keuntungan" type="number" placeholder="0" />
                  </div>
                </div>

                <div className="bg-muted space-y-3 rounded-lg p-4">
                  <div>
                    <div className="mb-1 text-sm font-medium">BEP dalam Unit:</div>
                    <div className="text-xl font-bold">0 unit</div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">BEP dalam Rupiah:</div>
                    <div className="text-xl font-bold">Rp 0</div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Rumus: Biaya Tetap ÷ (Harga Jual - Biaya Variabel)
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <DrawerFooter>
          <Button className="cursor-pointer">Simpan</Button>
          <DrawerClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Tutup
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
