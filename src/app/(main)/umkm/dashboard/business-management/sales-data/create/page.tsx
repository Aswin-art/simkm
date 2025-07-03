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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { X, Plus, ZoomIn } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const formSchema = z.object({
  name: z.string().min(3, { message: "Location name must be at least 3 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  image: z.string({ required_error: "Please upload a location image." }),
  tagId: z.string({ required_error: "Please select a tag location." }),
  facilities: z
    .array(
      z.object({
        id: z.string(),
        facilityId: z.string(),
        facilityName: z.string(),
        image: z.string(),
      }),
    )
    .default([]),
});

type FormValues = z.infer<typeof formSchema>;

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
      image: "",
      tagId: "",
      facilities: [],
    },
  });

  async function addLocation(data: FormValues) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/locations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add location");
    return res.json();
  }

  const { mutate, isPending } = useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan!");
      form.reset();
      router.push("/dashboards/locations");
    },
    onError: () => {
      toast.error("Gagal menambahkan lokasi. Tolong coba lagi.");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  const removeFacility = (id: string) => {
    const currentFacilities = form.getValues("facilities");
    form.setValue(
      "facilities",
      currentFacilities.filter((facility) => facility.id !== id),
    );
    toast.success("Fasilitas berhasil dihapus");
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
              <BreadcrumbLink href="/umkm/dashboard/business-management/sales-data">Data Penjualan</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tambah Data Penjualan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight">Form Penambahan Data</h2>
            <p className="text-muted-foreground max-w-lg text-sm">
              Lengkapi form dibawah ini untuk menambah data produk baru.
            </p>
          </div>
        </div>
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-28 space-y-6">
            {/* Image (single URL) */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gambar Lokasi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    {field.value ? (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="relative h-[500px] w-full">
                          <Image
                            src={field.value}
                            alt="submission image"
                            className="object-contain"
                            loading="lazy"
                            fill
                          />
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
                        endpoint="locations"
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
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nama Lokasi <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input disabled={form.formState.isSubmitting} placeholder="Masukkan nama lokasi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Alamat Lokasi <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input disabled={form.formState.isSubmitting} placeholder="Masukkan alamat lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fasum Section */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <FormLabel>
                    Fasilitas Umum <span className="text-red-500">*</span>
                  </FormLabel>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        size="sm"
                        className="flex cursor-pointer items-center gap-1 bg-blue-500 hover:bg-blue-600"
                      >
                        <Plus className="h-4 w-4" /> Tambah Fasilitas
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>

                {/* Display Added Facilities */}
                <FormField
                  control={form.control}
                  name="facilities"
                  render={({ field }) => (
                    <FormItem>
                      {field.value.length === 0 ? (
                        <p className="text-muted-foreground text-sm">Belum ada fasilitas yang ditambahkan</p>
                      ) : (
                        <div className="mb-4 space-y-2">
                          {field.value.map((facility, index) => (
                            <div
                              key={facility.id}
                              className="flex w-full items-center justify-between rounded-md border p-2"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="group relative h-16 w-16 cursor-pointer overflow-hidden rounded-md"
                                  onClick={() => {
                                    setLightboxIndex(index);
                                    setLightboxOpen(true);
                                  }}
                                >
                                  <Image
                                    src={facility.image}
                                    alt={facility.facilityName}
                                    fill
                                    className="transition-filter object-cover filter duration-300 group-hover:blur-sm"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <ZoomIn size={24} className="text-white" />
                                  </div>
                                </div>
                                <p className="font-medium">{facility.facilityName}</p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-700"
                                onClick={() => removeFacility(facility.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}

                          <Lightbox
                            open={lightboxOpen}
                            close={() => setLightboxOpen(false)}
                            index={lightboxIndex}
                            slides={field.value.map((facility) => ({
                              src: facility.image,
                            }))}
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Deskripsi Tempat <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={form.formState.isSubmitting}
                        placeholder="Tuliskan deskripsi"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <Link
                href={"/dashboards/locations"}
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                Kembali
              </Link>
              <Button type="submit" disabled={isPending} className="cursor-pointer bg-blue-500 hover:bg-blue-600">
                {isPending ? "Loading..." : "Tambahkan Data"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default Page;
