import React from "react";

import Link from "next/link";

import { Plus } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";

export default function Page() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/umkm/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Daftar Produk</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Daftar Produk</h2>
        </div>
        <Link
          href={"/umkm/dashboard/business-management/product-list/create"}
          className={cn(buttonVariants(), "bg-primary hover:bg-primary/80 text-xs md:text-sm")}
        >
          <Plus className="mr-2 size-4" /> Tambah Data
        </Link>
      </div>
      <Separator />
      <DataTable data={data} />
    </div>
  );
}
