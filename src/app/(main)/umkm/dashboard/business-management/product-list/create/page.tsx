"use client";
import React, { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(3, { message: "Nama produk minimal 3 karakter." }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter." }),
  price: z.number().min(0, { message: "Harga harus lebih dari 0." }),
  image: z.string({ required_error: "Harap upload gambar produk." }),

  hpp: z.object({
    biayaBahanBaku: z.number().min(0, { message: "Biaya bahan baku harus lebih dari 0." }),
    biayaTenagaKerja: z.number().min(0, { message: "Biaya tenaga kerja harus lebih dari 0." }),
    biayaLainLain: z.number().min(0, { message: "Biaya lain-lain harus lebih dari 0." }),
    jumlahUnitProduksi: z.number().min(1, { message: "Jumlah unit produksi minimal 1." }),
  }),

  bep: z.object({
    biayaTetap: z.number().min(0, { message: "Biaya tetap harus lebih dari 0." }),
    biayaJualPerUnit: z.number().min(0, { message: "Biaya jual per unit harus lebih dari 0." }),
    biayaVariabelPerUnit: z.number().min(0, { message: "Biaya variabel per unit harus lebih dari 0." }),
    marginKeuntungan: z.number().min(0, { message: "Margin keuntungan harus lebih dari 0." }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Page = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      hpp: {
        biayaBahanBaku: 0,
        biayaTenagaKerja: 0,
        biayaLainLain: 0,
        jumlahUnitProduksi: 1,
      },
      bep: {
        biayaTetap: 0,
        biayaJualPerUnit: 0,
        biayaVariabelPerUnit: 0,
        marginKeuntungan: 0,
      },
    },
  });

  async function addProduct(data: FormValues) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add product");
    return res.json();
  }

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Produk berhasil ditambahkan!");
      form.reset();
      router.push("/dashboards/products");
    },
    onError: () => {
      toast.error("Gagal menambahkan produk. Tolong coba lagi.");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <ScrollArea className="mt-15 h-full md:mt-0">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/umkm/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/umkm/dashboard/business-management/product-list">Daftar Produk</BreadcrumbLink>
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
              Lengkapi form dibawah ini untuk menambah produk baru.
            </p>
          </div>
        </div>
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-28 space-y-6">
            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gambar Produk <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    {field.value ? (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="relative h-[500px] w-full">
                          <Image src={field.value} alt="product image" className="object-contain" loading="lazy" fill />
                        </div>

                        <Button
                          variant={"ghost"}
                          type="button"
                          className="cursor-pointer"
                          onClick={() => form.setValue("image", "")}
                        >
                          <X className="h-4 w-4" /> Hapus
                        </Button>
                      </div>
                    ) : (
                      <UploadDropzone
                        disabled={form.formState.isSubmitting}
                        endpoint="images"
                        className="relative h-[500px] w-full"
                        onClientUploadComplete={(res) => {
                          form.setValue("image", res[0].url);
                        }}
                        onUploadError={(error) => console.error("Upload error:", error)}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Basic Product Info */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nama Produk <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input disabled={form.formState.isSubmitting} placeholder="Masukkan nama produk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Harga Produk <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={form.formState.isSubmitting}
                        placeholder="Masukkan harga produk"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel>
                      Deskripsi Produk <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={form.formState.isSubmitting}
                        placeholder="Tuliskan deskripsi produk"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* HPP Section */}
            <Card>
              <CardHeader>
                <CardTitle>Harga Pokok Produksi (HPP)</CardTitle>
                <CardDescription>Perhitungan biaya produksi untuk menentukan harga pokok produk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {/* Biaya Bahan Baku */}
                  <FormField
                    control={form.control}
                    name="hpp.biayaBahanBaku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Biaya Bahan Baku <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={form.formState.isSubmitting}
                            placeholder="Masukkan biaya bahan baku"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Biaya Tenaga Kerja */}
                  <FormField
                    control={form.control}
                    name="hpp.biayaTenagaKerja"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Biaya Tenaga Kerja <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={form.formState.isSubmitting}
                            placeholder="Masukkan biaya tenaga kerja"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Biaya Lain-lain */}
                  <FormField
                    control={form.control}
                    name="hpp.biayaLainLain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Biaya Lain-lain <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={form.formState.isSubmitting}
                            placeholder="Masukkan biaya lain-lain"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Jumlah Unit Produksi */}
                  <FormField
                    control={form.control}
                    name="hpp.jumlahUnitProduksi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Jumlah Unit Produksi <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={form.formState.isSubmitting}
                            placeholder="Masukkan jumlah unit produksi"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* BEP Section */}
            <Card>
              <CardHeader>
                <CardTitle>Break Even Point (BEP)</CardTitle>
                <CardDescription>Perhitungan titik impas untuk menentukan target penjualan minimum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {/* Biaya Tetap */}
                  <FormField
                    control={form.control}
                    name="bep.biayaTetap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Biaya Tetap <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={form.formState.isSubmitting}
                            placeholder="Masukkan biaya tetap"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Biaya Jual Per Unit */}
                  <FormField
                    control={form.control}
                    name="bep.biayaJualPerUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Biaya Jual Per Unit <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={form.formState.isSubmitting}
                            placeholder="Masukkan biaya jual per unit"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Biaya Variabel Per Unit */}
                  <FormField
                    control={form.control}
                    name="bep.biayaVariabelPerUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Biaya Variabel Per Unit <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={form.formState.isSubmitting}
                            placeholder="Masukkan biaya variabel per unit"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Margin Keuntungan */}
                  <FormField
                    control={form.control}
                    name="bep.marginKeuntungan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Margin Keuntungan <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={form.formState.isSubmitting}
                            placeholder="Masukkan margin keuntungan"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Link
                href={"/umkm/dashboard/business-management/product-list"}
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                Kembali
              </Link>
              <Button type="submit" disabled={isPending} className="bg-primary cursor-pointer">
                {isPending ? "Loading..." : "Tambah Produk"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default Page;
