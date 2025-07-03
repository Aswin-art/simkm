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
    <div className="relative flex flex-col gap-4 overflow-auto">
      <div className="overflow-hidden rounded-lg border">
        <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
