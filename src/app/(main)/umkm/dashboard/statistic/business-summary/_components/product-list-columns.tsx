import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { productListSchema } from "./schema";
import { Checkbox } from "@/components/ui/checkbox";

export const productListColumns: ColumnDef<z.infer<typeof productListSchema>>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Name" />,
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => (
      <span>
        {row.original.description.length > 100
          ? row.original.description.substring(0, 100) + "..."
          : row.original.description}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => <span>Rp {row.original.price.toLocaleString()}</span>,
  },
  {
    accessorKey: "hpp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="HPP" />,
    cell: ({ row }) => <span>Rp {row.original.hpp.toLocaleString()}</span>,
  },
  {
    accessorKey: "bep",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BEP" />,
    cell: ({ row }) => <span>Rp {row.original.bep.toLocaleString()}</span>,
  },
];
