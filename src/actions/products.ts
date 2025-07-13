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
    orderBy: { createdAt: "desc" },
  });

  const plainProducts = products.map((p) => ({
    ...p,
    price: Number(p.price),
    rawMaterialCost: Number(p.rawMaterialCost),
    hppPerUnit: Number(p.hppPerUnit),
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
  price: number;
  rawMaterialCost: number;
  totalProduced: number;
  hppPerUnit: number;
  bepUnit: number;
}) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  try {
    const product = await db.product.create({
      data: {
        name: data.name,
        price: data.price,
        rawMaterialCost: data.rawMaterialCost,
        totalProduced: data.totalProduced,
        hppPerUnit: data.hppPerUnit,
        bepUnit: data.bepUnit,
        userId: userId,
      },
    });

    return { success: true, product };
  } catch (err) {
    console.log(err);
    return { error: "Terjadi kesalahan saat memasukkan data" };
  }
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
