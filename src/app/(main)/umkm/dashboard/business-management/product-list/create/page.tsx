"use client";
import React from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Link from "next/link";
import { create } from "@/actions/products";

const productFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  image: z.string().url(),

  rawMaterialCost: z.number().min(0),
  laborCost: z.number().min(0),
  overheadCost: z.number().min(0),
  unitProduced: z.number().min(1),
  hppPerUnit: z.number().min(0),

  fixedCost: z.number().min(0),
  pricePerUnit: z.number().min(0),
  variableCostPerUnit: z.number().min(0),
  profitMargin: z.number().min(0),
  bepUnit: z.number().min(0),
});

type FormValues = z.infer<typeof productFormSchema>;

const Page = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",

      rawMaterialCost: 0,
      laborCost: 0,
      overheadCost: 0,
      unitProduced: 1,
      hppPerUnit: 0,

      fixedCost: 0,
      pricePerUnit: 0,
      variableCostPerUnit: 0,
      profitMargin: 0,
      bepUnit: 0,
    },
  });

  const onSubmit = async (values: any) => {
    const hppPerUnit = (values.rawMaterialCost + values.laborCost + values.overheadCost) / values.unitProduced;

    const bepUnit = values.fixedCost / (values.pricePerUnit - values.variableCostPerUnit);

    const finalData = {
      ...values,
      hppPerUnit,
      bepUnit,
    };

    const result = await create(finalData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Produk berhasil ditambahkan!");
      form.reset();
      router.push("/umkm/dashboard/business-management/product-list");
    }
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
                          className="cursor-pointer"
                          variant="ghost"
                          type="button"
                          onClick={() => form.setValue("image", "")}
                        >
                          <X className="h-4 w-4" /> Hapus
                        </Button>
                      </div>
                    ) : (
                      <UploadDropzone
                        disabled={form.formState.isSubmitting}
                        endpoint="images"
                        className="relative h-[500px] w-full cursor-pointer"
                        onClientUploadComplete={(res) => form.setValue("image", res[0].url)}
                        onUploadError={(error) => console.error("Upload error:", error)}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      <Input disabled={form.formState.isSubmitting} placeholder="Masukkan nama produk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

            <Card>
              <CardHeader>
                <CardTitle>Harga Pokok Produksi (HPP)</CardTitle>
                <CardDescription>Perhitungan biaya produksi untuk menentukan harga pokok produk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="rawMaterialCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biaya Bahan Baku</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="laborCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biaya Tenaga Kerja</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="overheadCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biaya Lain-lain</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unitProduced"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah Unit Produksi</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Break Even Point (BEP)</CardTitle>
                <CardDescription>Perhitungan titik impas untuk menentukan target penjualan minimum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fixedCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biaya Tetap</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pricePerUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harga Jual Per Unit</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="variableCostPerUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biaya Variabel Per Unit</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profitMargin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Margin Keuntungan</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
    </ScrollArea>
  );
};

export default Page;
