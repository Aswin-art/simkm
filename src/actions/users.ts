"use server";

import { db } from "@/lib/db";
import { startOfMonth } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const id = cookieStore.get("userId")?.value ?? "";

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (user === null) {
    cookieStore.set("auth-token", "", { path: "/", maxAge: 0 });
    cookieStore.set("userId", "", { path: "/", maxAge: 0 });
    cookieStore.set("role", "", { path: "/", maxAge: 0 });

    redirect("/auth/login");
  }

  const data = { ...user, avatar: "/avatars/arhamkhnz.png" };

  return { success: true, data };
}

export async function getAllUmkmUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value ?? "";

  if (!token) {
    redirect("/auth/login");
  }

  const users = await db.user.findMany({
    where: {
      role: "umkm",
    },
    include: {
      products: {
        include: {
          sales: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const startOfThisMonth = startOfMonth(new Date());

  const formattedUsers = users.map((user) => {
    let totalSales = 0;
    let monthlySales = 0;

    for (const product of user.products) {
      for (const sale of product.sales) {
        const total = Number(sale.totalPrice);
        totalSales += total;

        if (new Date(sale.date) >= startOfThisMonth) {
          monthlySales += total;
        }
      }
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      totalSales,
      monthlySales,
      createdAt: user.createdAt,
    };
  });

  return {
    success: true,
    data: formattedUsers,
  };
}

export async function findUmkmUser(id: string) {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value ?? "";

  if (!token) {
    redirect("/auth/login");
  }

  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          _count: {
            select: {
              sales: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return {
      error: "Data tidak ditemukan!",
    };
  }

  const formattedUser = {
    ...user,
    products: user.products.map((product) => ({
      ...product,
      price: Number(product.price),
      rawMaterialCost: Number(product.rawMaterialCost),
      laborCost: Number(product.laborCost),
      overheadCost: Number(product.overheadCost),
      totalCost: Number(product.totalCost),
      hppPerUnit: Number(product.hppPerUnit),
      fixedCost: Number(product.fixedCost),
      variableCostPerUnit: Number(product.variableCostPerUnit),
      pricePerUnit: Number(product.pricePerUnit),
      profitMargin: Number(product.profitMargin),
      bepUnit: Number(product.bepUnit),
      salesCount: product._count.sales,
    })),
  };

  return {
    success: true,
    data: formattedUser,
  };
}

export async function removeUmkm(id: string) {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value ?? "";

  if (!token) {
    redirect("/auth/login");
  }

  const user = await db.user.delete({
    where: {
      id,
    },
  });

  if (!user) {
    return {
      error: "Data tidak ditemukan!",
    };
  }

  return {
    success: true,
  };
}
