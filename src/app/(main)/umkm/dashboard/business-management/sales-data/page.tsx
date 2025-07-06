"use client";
import React, { useState } from "react";
import { Plus, Check, ChevronsUpDown } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";

const products = [
  { value: "laptop-gaming", label: "Laptop Gaming ASUS ROG" },
  { value: "smartphone-iphone", label: "Smartphone iPhone 15" },
  { value: "headphone-sony", label: "Headphone Sony WH-1000XM5" },
  { value: "keyboard-mechanical", label: "Keyboard Mechanical Logitech" },
  { value: "mouse-wireless", label: "Mouse Wireless Logitech MX Master" },
  { value: "monitor-4k", label: "Monitor 4K Samsung 27 inch" },
  { value: "webcam-logitech", label: "Webcam Logitech C920" },
  { value: "tablet-ipad", label: "Tablet iPad Pro 11 inch" },
];

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { selectedProduct, quantity });

    setSelectedProduct("");
    setQuantity("");
    setIsDialogOpen(false);
  };

  return (
    <div className="flex-1 space-y-4 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/umkm/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Penjualan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Data Penjualan</h2>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/80 cursor-pointer text-xs md:text-sm">
              <Plus className="mr-2 size-4" /> Tambah Penjualan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Data Penjualan</DialogTitle>
              <DialogDescription>Masukkan data penjualan baru. Klik simpan untuk menambahkan data.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Nama Produk</Label>
                <Popover open={isProductOpen} onOpenChange={setIsProductOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isProductOpen}
                      className="w-full justify-between"
                    >
                      {selectedProduct
                        ? products.find((product) => product.value === selectedProduct)?.label
                        : "Pilih produk..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Cari produk..." />
                      <CommandList>
                        <CommandEmpty>Tidak ada produk ditemukan.</CommandEmpty>
                        <CommandGroup>
                          {products.map((product) => (
                            <CommandItem
                              key={product.value}
                              value={product.value}
                              onSelect={(currentValue) => {
                                setSelectedProduct(currentValue === selectedProduct ? "" : currentValue);
                                setIsProductOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedProduct === product.value ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {product.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Masukkan jumlah"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/80 cursor-pointer"
                  disabled={!selectedProduct || !quantity}
                >
                  Simpan
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Separator />
      <DataTable data={data} />
    </div>
  );
}
