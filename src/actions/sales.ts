"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function index() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  const sales = await db.sale.findMany({
    where: {
      product: {
        userId,
      },
    },
    include: {
      product: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const convertedSales = sales.map((sale) => ({
    ...sale,
    totalPrice: Number(sale.totalPrice),
    product: {
      ...sale.product,
      price: Number(sale.product.price),
      rawMaterialCost: Number(sale.product.rawMaterialCost),
      laborCost: Number(sale.product.laborCost),
      overheadCost: Number(sale.product.overheadCost),
      totalCost: Number(sale.product.totalCost),
      hppPerUnit: Number(sale.product.hppPerUnit),
      fixedCost: Number(sale.product.fixedCost),
      variableCostPerUnit: Number(sale.product.variableCostPerUnit),
      pricePerUnit: Number(sale.product.pricePerUnit),
      profitMargin: Number(sale.product.profitMargin),
      bepUnit: Number(sale.product.bepUnit),
    },
  }));

  return { success: true, sales: convertedSales };
}

export async function create(data: { productName: string; quantity: number }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  const product = await db.product.findFirst({
    where: { name: data.productName, userId },
    select: { id: true, price: true },
  });

  if (!product) {
    return { error: "Produk tidak ditemukan" };
  }

  const totalPrice = Number(product.price) * data.quantity;

  await db.sale.create({
    data: {
      productId: product.id,
      quantity: data.quantity,
      date: new Date(),
      totalPrice,
    },
  });

  return { success: true };
}

export async function remove(id: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  const sale = await db.sale.findFirst({
    where: {
      id,
      product: {
        userId,
      },
    },
    select: { id: true },
  });

  if (!sale) {
    return { error: "Penjualan tidak ditemukan atau tidak diizinkan" };
  }

  await db.sale.delete({ where: { id } });

  return { success: true, message: "Penjualan berhasil dihapus" };
}

export async function getAllUmkmSales() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value ?? "";

  if (!token) {
    redirect("/auth/login");
  }

  const sales = await db.sale.findMany({
    include: {
      product: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  const convertedSales = sales.map((sale) => ({
    ...sale,
    totalPrice: Number(sale.totalPrice),
    product: {
      ...sale.product,
      price: Number(sale.product.price),
      rawMaterialCost: Number(sale.product.rawMaterialCost),
      laborCost: Number(sale.product.laborCost),
      overheadCost: Number(sale.product.overheadCost),
      totalCost: Number(sale.product.totalCost),
      hppPerUnit: Number(sale.product.hppPerUnit),
      fixedCost: Number(sale.product.fixedCost),
      variableCostPerUnit: Number(sale.product.variableCostPerUnit),
      pricePerUnit: Number(sale.product.pricePerUnit),
      profitMargin: Number(sale.product.profitMargin),
      bepUnit: Number(sale.product.bepUnit),
    },
  }));

  return {
    success: true,
    data: convertedSales,
  };
}
