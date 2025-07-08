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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span>{row.original.email}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Telepon" />,
    cell: ({ row }) => <span>{row.original.phone}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" />,
    cell: ({ row }) => (
      <span>
        {row.original.address.length > 50 ? row.original.address.substring(0, 50) + "..." : row.original.address}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Bergabung" />,
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return (
        <span>
          {date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    enableSorting: false,
  },
];
