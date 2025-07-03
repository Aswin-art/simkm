"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable as DataTableNew } from "@/components/user-sales-table/data-table";
import { DataTablePagination } from "@/components/user-sales-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/user-sales-table/data-table-view-options";
import { withDndColumn } from "@/components/user-sales-table/table-utils";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { dashboardColumns } from "./columns";
import { sectionSchema } from "./schema";

export function DataTable({ data: initialData }: { data: z.infer<typeof sectionSchema>[] }) {
  const [data, setData] = React.useState(() => initialData);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

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
          <DataTableViewOptions table={table} />
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Tambah Produk</span>
          </Button>
        </div>
      </div>
      <TabsContent value="last-sales" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
      <TabsContent value="list-product" className="flex flex-col">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
    </Tabs>
  );
}
