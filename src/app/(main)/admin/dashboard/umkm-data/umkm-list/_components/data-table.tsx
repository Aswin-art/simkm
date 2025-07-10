"use client";

import React, { useCallback, useEffect, useState } from "react";

import { DataTable as ListProduct } from "@/components/user-sales-table/data-table";
import { DataTablePagination } from "@/components/user-sales-table/data-table-pagination";
import { withDndColumn } from "@/components/user-sales-table/table-utils";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { dashboardColumns } from "./columns";
import { getAllUmkmUser } from "@/actions/users";

export function DataTable() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

  const handleFetchData = useCallback(async () => {
    const response = await getAllUmkmUser();

    if (response.success) {
      setData(response.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border">
        <span className="text-muted-foreground text-sm">Loading data...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border">
        <span className="text-muted-foreground text-sm">Tidak ada data.</span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-4 overflow-auto">
      <div className="overflow-hidden rounded-lg border">
        <ListProduct table={table} columns={columns} />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
