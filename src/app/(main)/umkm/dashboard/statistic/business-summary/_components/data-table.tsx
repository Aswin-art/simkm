"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { z } from "zod";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable as ProductList } from "@/components/user-sales-table/data-table";
import { DataTablePagination } from "@/components/user-sales-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/user-sales-table/data-table-view-options";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { lastSalesColumns } from "./last-sales-columns";
import { productListColumns } from "./product-list-columns";
import { lastSalesSchema, productListSchema } from "./schema";
import Link from "next/link";

export function DataTable({
  lastSales,
  productList,
}: {
  lastSales: z.infer<typeof lastSalesSchema>[];
  productList: z.infer<typeof productListSchema>[];
}) {
  const [lastSalesData, setLastSalesData] = React.useState(() => lastSales);
  const lastSalesTable = useDataTableInstance({
    data: lastSalesData,
    columns: lastSalesColumns,
    getRowId: (row) => row.id.toString(),
  });

  const [productListData, setProductListData] = React.useState(() => productList);
  const productListTable = useDataTableInstance({
    data: productListData,
    columns: productListColumns,
    getRowId: (row) => row.id.toString(),
  });

  return (
    <Tabs defaultValue="last-sales" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="last-sales">
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-sales">Penjualan Terakhir</SelectItem>
            <SelectItem value="list-product">Daftar Produk</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="last-sales" className="cursor-pointer">
            Penjualan Terakhir
          </TabsTrigger>
          <TabsTrigger value="list-product" className="cursor-pointer">
            Daftar Produk
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={lastSalesTable} />
          <Link
            href="/umkm/dashboard/business-management/product-list/create"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Plus />
            <span className="hidden lg:inline">Tambah Produk</span>
          </Link>
        </div>
      </div>
      <TabsContent value="last-sales" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <ProductList dndEnabled table={lastSalesTable} columns={lastSalesColumns} />
        </div>
        <DataTablePagination table={lastSalesTable} />
      </TabsContent>
      <TabsContent value="list-product" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <ProductList
            dndEnabled
            table={productListTable}
            columns={productListColumns}
            onReorder={setProductListData}
          />
        </div>
        <DataTablePagination table={productListTable} />
      </TabsContent>
    </Tabs>
  );
}
