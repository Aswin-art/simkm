"use client";

import * as React from "react";

import { DataTable as ListSales } from "@/components/user-sales-table/data-table";
import { DataTablePagination } from "@/components/user-sales-table/data-table-pagination";
import { withDndColumn } from "@/components/user-sales-table/table-utils";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { dashboardColumns } from "./columns";
import { toast } from "sonner";
import { index } from "@/actions/sales";

export function DataTable() {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

  const handleFetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await index();

      if (response.error) {
        toast.error(response.error);
      }

      if (response.success) {
        setData(response.sales);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <div className="relative flex flex-col gap-4 overflow-auto">
      <div className="overflow-hidden rounded-lg border">
        {loading ? (
          <div className="text-muted-foreground p-6 text-center">Memuat data...</div>
        ) : (
          <ListSales table={table} columns={columns} />
        )}
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
