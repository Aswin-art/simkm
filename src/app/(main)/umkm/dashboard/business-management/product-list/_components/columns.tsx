import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { sectionSchema } from "./schema";
import { CellAction } from "./cell-action";

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
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Produk" />,
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Harga" />,
    cell: ({ row }) => <span>Rp {row.original.price.toLocaleString()}</span>,
  },
  {
    accessorKey: "hpp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="HPP" />,
    cell: ({ row }) => <span>Rp. {row.original.hpp.toLocaleString()}/unit</span>,
  },
  {
    accessorKey: "bep",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BEP" />,
    cell: ({ row }) => <span>{row.original.bep.toFixed()} unit</span>,
  },
  {
    accessorKey: "totalSales",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Penjualan" />,
    cell: ({ row }) => <span>{row.original.totalSales}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction item={row.original} />,
    enableSorting: false,
  },
];
