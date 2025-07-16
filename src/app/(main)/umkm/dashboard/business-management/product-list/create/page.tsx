"use client";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { create } from "@/actions/products";

const productFormSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  rawMaterialCost: z.number().min(0, "Biaya bahan masak harus lebih dari 0"),
  totalProduced: z.number().min(1, "Jumlah hasil produksi minimal 1"),
  price: z.number().min(0, "Harga jual harus lebih dari 0"),

  hppPerUnit: z.number().min(0),
  bepUnit: z.number().min(0),
});

type FormValues = z.infer<typeof productFormSchema>;

const Page = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      rawMaterialCost: 0,
      totalProduced: 1,
      price: 0,
      hppPerUnit: 0,
      bepUnit: 0,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const { rawMaterialCost, totalProduced, price } = watchedValues;

    const hppPerUnit = totalProduced > 0 ? rawMaterialCost / totalProduced : 0;

    const bepUnit = price - hppPerUnit > 0 ? rawMaterialCost / (price - hppPerUnit) : 0;

    form.setValue("hppPerUnit", hppPerUnit, { shouldValidate: false });
    form.setValue("bepUnit", bepUnit, { shouldValidate: false });
  }, [watchedValues.rawMaterialCost, watchedValues.totalProduced, watchedValues.price, form]);

  const onSubmit = async (values: any) => {
    const result = await create(values);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Produk berhasil ditambahkan!");
      form.reset();
      router.push("/umkm/dashboard/business-management/product-list");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/umkm/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/umkm/dashboard/business-management/product-list">Data Produk</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tambah Produk</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Form Produk</h2>
          <p className="text-muted-foreground max-w-lg text-sm">
            Lengkapi form dibawah ini untuk menambah produk baru. HPP dan BEP akan dihitung otomatis.
          </p>
        </div>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-28 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Produk</CardTitle>
              <CardDescription>Isi data produk Anda di bawah ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nama Produk <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input disabled={form.formState.isSubmitting} placeholder="Contoh: Kue Brownies" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rawMaterialCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Biaya Bahan Masak <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={form.formState.isSubmitting}
                          placeholder="Contoh: 50000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-muted-foreground text-xs">Total biaya semua bahan untuk memasak</p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalProduced"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Jumlah Hasil Produksi <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={form.formState.isSubmitting}
                          placeholder="Contoh: 10"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-muted-foreground text-xs">Berapa banyak produk yang dihasilkan</p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Harga Jual <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={form.formState.isSubmitting}
                          placeholder="Contoh: 15000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-muted-foreground text-xs">Harga jual per produk</p>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hasil Perhitungan</CardTitle>
              <CardDescription>HPP dan BEP dihitung otomatis berdasarkan data yang Anda masukkan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-lg border p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                  <h3 className="mb-3 font-medium dark:text-slate-300">HPP (Harga Pokok Produksi)</h3>
                  <p className="text-2xl font-semibold dark:text-white">{formatCurrency(watchedValues.hppPerUnit)}</p>
                  <p className="mt-1 text-sm dark:text-slate-400">per produk</p>
                </div>

                <div className="rounded-lg border p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                  <h3 className="mb-3 font-medium dark:text-slate-300">BEP (Break Even Point)</h3>
                  <p className="text-2xl font-semibold dark:text-white">{Math.ceil(watchedValues.bepUnit)} produk</p>
                  <p className="mt-1 text-sm dark:text-slate-400">untuk balik modal</p>
                </div>
              </div>

              {watchedValues.price > 0 && watchedValues.hppPerUnit > 0 && (
                <div className="mt-6 rounded-lg border p-5 backdrop-blur-sm dark:border-white/8 dark:bg-white/3">
                  <h4 className="mb-3 font-medium dark:text-slate-300">Informasi Keuntungan</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm dark:text-slate-400">Keuntungan per produk</span>
                      <span className="font-medium dark:text-white">
                        {formatCurrency(watchedValues.price - watchedValues.hppPerUnit)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm dark:text-slate-400">Margin keuntungan</span>
                      <span className="font-medium dark:text-white">
                        {watchedValues.price > 0
                          ? `${(((watchedValues.price - watchedValues.hppPerUnit) / watchedValues.price) * 100).toFixed(1)}%`
                          : "0%"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Link
              href="/umkm/dashboard/business-management/product-list"
              className={buttonVariants({ variant: "ghost" })}
            >
              Kembali
            </Link>
            <Button type="submit" disabled={form.formState.isSubmitting} className="bg-primary cursor-pointer">
              {form.formState.isSubmitting ? "Loading..." : "Tambah Produk"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
