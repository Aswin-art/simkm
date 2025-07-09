"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { z } from "zod";

import { buttonVariants } from "@/components/ui/button";
import { DataTable as ProductList } from "@/components/user-sales-table/data-table";
import { DataTablePagination } from "@/components/user-sales-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/user-sales-table/data-table-view-options";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { lastSalesColumns } from "./last-sales-columns";
import { lastSalesSchema } from "./schema";
import Link from "next/link";

export function DataTable({ lastSales }: { lastSales: z.infer<typeof lastSalesSchema>[] }) {
  const [lastSalesData, setLastSalesData] = React.useState(() => lastSales);
  const lastSalesTable = useDataTableInstance({
    data: lastSalesData,
    columns: lastSalesColumns,
    getRowId: (row) => row.id.toString(),
  });

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
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
      <div className="relative mt-3 flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <ProductList dndEnabled table={lastSalesTable} columns={lastSalesColumns} />
        </div>
        <DataTablePagination table={lastSalesTable} />
      </div>
    </div>
  );
}
