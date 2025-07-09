"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";

import { DataTable as ListProduct } from "@/components/user-sales-table/data-table";
import { DataTablePagination } from "@/components/user-sales-table/data-table-pagination";
import { withDndColumn } from "@/components/user-sales-table/table-utils";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { dashboardColumns } from "./columns";
import { sectionSchema } from "./schema";
import { index } from "@/actions/products";

type Product = z.infer<typeof sectionSchema>;

export function DataTable() {
  const [data, setData] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  const columns = React.useMemo(() => withDndColumn(dashboardColumns), []);
  const table = useDataTableInstance({
    data,
    columns,
    getRowId: (row) => row.id.toString(),
  });

  const handleFetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await index();

      if (response.error) {
        toast.error(response.error);
      }

      if (response.success) {
        const mappedData = response.data.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: Number(product.price),
          totalCost: Number(product.totalCost),
          profitMargin: Number(product.profitMargin),
          hpp: Number(product.hppPerUnit),
          bep: Number(product.bepUnit),
          totalSales: Number(product._count.sales || 0),
        }));

        const validated = sectionSchema.array().safeParse(mappedData);

        if (!validated.success) {
          toast.error("Data tidak valid");
          console.error(validated.error);
          return;
        }

        setData(validated.data);
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
          <ListProduct table={table} columns={columns} />
        )}
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
