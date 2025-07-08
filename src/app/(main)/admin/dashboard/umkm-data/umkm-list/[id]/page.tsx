"use client";
import React, { use } from "react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import tableData from "./_components/data.json";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  console.log("ID:", id);

  const data = {
    id: 4,
    name: "Technical approach",
    email: "technical@umkm.id",
    phone: 628123456004,
    address:
      "Jl. UMKM No. 4, Desa Teknologi Usaha, Kecamatan Digital, Kabupaten Startup, Provinsi Industri Kreatif, RT 02 RW 06, Kode Pos 45678. Area Inkubasi Bisnis, Kamar 12B. (Alamat minimal 250 karakter).",
    created_at: "2025-07-06T09:15:00.000Z",
  };

  const salesData = [
    { id: 1, product: "Produk A", quantity: 10, total: 150000, date: "2025-07-05" },
    { id: 2, product: "Produk B", quantity: 5, total: 85000, date: "2025-07-04" },
    { id: 3, product: "Produk C", quantity: 8, total: 120000, date: "2025-07-03" },
  ];

  return (
    <ScrollArea className="mt-15 h-full md:mt-0">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard/umkm-data/umkm-list">Daftar Produk</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail Usaha</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight">Detail Usaha</h2>
          </div>
        </div>
        <Separator />

        <div className="mb-28 space-y-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Nama Usaha <span className="text-red-500">*</span>
              </label>
              <Input disabled value={data.name} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Email Pengusaha <span className="text-red-500">*</span>
              </label>
              <Input disabled value={data.email} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                No. Telp Pengusaha <span className="text-red-500">*</span>
              </label>
              <Input disabled value={data.phone} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Alamat Usaha <span className="text-red-500">*</span>
              </label>
              <Textarea disabled className="min-h-32" value={data.address} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">Produk Usaha</h3>
            <DataTable data={tableData} />
          </div>

          <div className="flex gap-2">
            <Link
              href={"/admin/dashboard/umkm-data/umkm-list"}
              className={buttonVariants({
                className: "bg-primary",
              })}
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Page;
