"use client";
import React, { use, useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { findUmkmUser } from "@/actions/users";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchData = async () => {
    setIsLoading(true);
    const response = await findUmkmUser(id);

    if (response.error) {
      toast.error(response.error);
    }

    if (response.success) {
      setData(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/umkm-data/umkm-list">Data Produk</BreadcrumbLink>
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
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="mb-2 h-4 w-1/3" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : data ? (
          <>
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
              {data.products?.length > 0 ? (
                <DataTable data={data.products} />
              ) : (
                <p className="text-muted-foreground text-sm">Tidak ada produk yang terdaftar.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-center">Data tidak ditemukan.</p>
        )}

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
  );
};

export default Page;
