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
      </div>

      <Separator />
      <DataTable data={data} />
    </div>
  );
}
