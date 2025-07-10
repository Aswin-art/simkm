import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { sectionSchema } from "./schema";
import Image from "next/image";

export const dashboardColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Foto Produk" />,
    cell: ({ row }) => (
      <div className="relative h-14 w-14 overflow-hidden rounded border">
        <Image
          src={
            row.original.image ||
            "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png"
          }
          alt={row.original.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png";
          }}
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Produk" />,
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deskripsi" />,
    cell: ({ row }) => (
      <span>
        {row.original.description.length > 50
          ? row.original.description.substring(0, 50) + "..."
          : row.original.description}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Harga" />,
    cell: ({ row }) => <span>Rp {row.original.price.toLocaleString()}</span>,
  },
  {
    accessorKey: "totalCost",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Biaya Pembuatan" />,
    cell: ({ row }) => <span>Rp {row.original.totalCost}</span>,
  },
  {
    accessorKey: "profitMargin",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Profit / Margin" />,
    cell: ({ row }) => <span>{row.original.profitMargin}%</span>,
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
