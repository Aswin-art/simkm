import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { sectionSchema } from "./schema";

export const dashboardColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "umkm_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="UMKM Name" />,
    cell: ({ row }) => <span>{row.original.umkm_name}</span>,
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Name" />,
    cell: ({ row }) => <span>{row.original.product_name}</span>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => <span>{new Date(row.original.date).toLocaleDateString("id-ID")}</span>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
    cell: ({ row }) => <span>{row.original.quantity}</span>,
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Price" />,
    cell: ({ row }) => <span>Rp {row.original.total_price.toLocaleString("id-ID")}</span>,
  },
];
