"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function index() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  const products = await db.product.findMany({
    where: { userId },
    include: {
      _count: {
        select: { sales: true },
      },
    },
  });

  const plainProducts = products.map((p) => ({
    ...p,
    price: Number(p.price),
    rawMaterialCost: Number(p.rawMaterialCost),
    laborCost: Number(p.laborCost),
    overheadCost: Number(p.overheadCost),
    totalCost: Number(p.totalCost),
    hppPerUnit: Number(p.hppPerUnit),
    fixedCost: Number(p.fixedCost),
    variableCostPerUnit: Number(p.variableCostPerUnit),
    pricePerUnit: Number(p.pricePerUnit),
    profitMargin: Number(p.profitMargin),
    bepUnit: Number(p.bepUnit),
  }));

  return { success: true, data: plainProducts };
}

export async function find(id: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  const product = await db.product.findFirst({
    where: { id, userId },
  });

  if (!product) {
    return { error: "Produk tidak ditemukan" };
  }

  return { success: true, product };
}

export async function create(data: {
  name: string;
  description: string;
  price: number;
  image: string;

  rawMaterialCost: number;
  laborCost: number;
  overheadCost: number;
  unitProduced: number;
  hppPerUnit: number;

  fixedCost: number;
  pricePerUnit: number;
  variableCostPerUnit: number;
  profitMargin: number;
  bepUnit: number;
}) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  const totalCost = data.rawMaterialCost + data.laborCost + data.overheadCost;

  try {
    const product = await db.product.create({
      data: {
        ...data,
        totalCost,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return { success: true, product };
  } catch (err) {
    console.log(err);
    return { error: "Terjadi kesalahan saat memasukkan data" };
  }
}

export async function update(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    bepUnit?: number;
    fixedCost?: number;
    hppPerUnit?: number;
    laborCost?: number;
    overheadCost?: number;
    pricePerUnit?: number;
    profitMargin?: number;
    rawMaterialCost?: number;
    totalCost?: number;
    unitProduced?: number;
    variableCostPerUnit?: number;
  },
) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  const existing = await db.product.findFirst({
    where: { id, userId },
    select: { id: true },
  });

  if (!existing) {
    return { error: "Produk tidak ditemukan atau tidak diizinkan" };
  }

  const product = await db.product.update({
    where: { id },
    data,
  });

  return { success: true, product };
}

export async function remove(id: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  const product = await db.product.findFirst({
    where: { id, userId },
    select: { id: true },
  });

  if (!product) {
    return { error: "Produk tidak ditemukan atau tidak diizinkan" };
  }

  await db.product.delete({
    where: { id },
  });

  return { success: true, message: "Produk berhasil dihapus" };
}
