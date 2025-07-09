"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";

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
  });

  return { success: true, sales };
}

export async function create(data: { productId: string; quantity: number; totalPrice: number }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Pengguna belum login" };
  }

  const product = await db.product.findFirst({
    where: { id: data.productId, userId },
    select: { id: true },
  });

  if (!product) {
    return { error: "Produk tidak ditemukan" };
  }

  const sale = await db.sale.create({
    data: {
      productId: data.productId,
      quantity: data.quantity,
      date: new Date(),
      totalPrice: data.totalPrice,
    },
  });

  return { success: true, sale };
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
