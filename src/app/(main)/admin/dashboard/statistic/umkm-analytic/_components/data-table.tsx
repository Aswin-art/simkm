"use client";

import * as React from "react";

import { z } from "zod";

import { DataTable as ProductList } from "@/components/user-sales-table/data-table";
import { DataTablePagination } from "@/components/user-sales-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/user-sales-table/data-table-view-options";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { dashboardColumns } from "./columns";
import { sectionSchema } from "./schema";

export function DataTable({ lastSales }: { lastSales: z.infer<typeof sectionSchema>[] }) {
  const [lastSalesData, setLastSalesData] = React.useState(() => lastSales);
  const lastSalesTable = useDataTableInstance({
    data: lastSalesData,
    columns: dashboardColumns,
    getRowId: (row) => row.id.toString(),
  });

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={lastSalesTable} />
        </div>
      </div>
      <div className="relative mt-3 flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <ProductList dndEnabled table={lastSalesTable} columns={dashboardColumns} />
        </div>
        <DataTablePagination table={lastSalesTable} />
      </div>
    </div>
  );
}
