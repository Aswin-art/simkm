import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { sectionSchema } from "./schema";

export const dashboardColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Produk" />,
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Harga" />,
    cell: ({ row }) => <span>Rp. {row.original.price.toLocaleString()}</span>,
  },
  {
    accessorKey: "hpp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="HPP" />,
    cell: ({ row }) => <span>Rp. {row.original.hppPerUnit.toLocaleString()}/unit</span>,
  },
  {
    accessorKey: "bep",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BEP" />,
    cell: ({ row }) => <span>{row.original.bepUnit.toLocaleString()} unit</span>,
  },
  {
    accessorKey: "salesCount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Penjualan" />,
    cell: ({ row }) => <span>{row.original.salesCount}</span>,
  },
];
