"use server";

import { db } from "@/lib/db";
import { subMonths, startOfDay } from "date-fns";
import { cookies } from "next/headers";

export async function getUmkmDashboardAnalytics() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const threeMonthsAgo = subMonths(new Date(), 3);

  if (!userId) {
    return { error: "Pengguna belum login!" };
  }

  // === Penjualan ===
  const totalSales = await db.sale.aggregate({
    _sum: { totalPrice: true },
    where: {
      date: { gte: startOfDay(threeMonthsAgo) },
      product: { userId },
    },
  });

  const twoMonthsAgo = subMonths(new Date(), 2);
  const oneMonthAgo = subMonths(new Date(), 1);

  const lastMonthSales = await db.sale.aggregate({
    _sum: { totalPrice: true },
    where: {
      date: {
        gte: startOfDay(twoMonthsAgo),
        lt: startOfDay(oneMonthAgo),
      },
      product: { userId },
    },
  });

  const currentMonthSales = await db.sale.aggregate({
    _sum: { totalPrice: true },
    where: {
      date: { gte: startOfDay(oneMonthAgo) },
      product: { userId },
    },
  });

  const totalSalesValue = Number(totalSales._sum.totalPrice ?? 0);
  const currentSales = Number(currentMonthSales._sum.totalPrice ?? 0);
  const lastSales = Number(lastMonthSales._sum.totalPrice ?? 0);
  const salesDiff = currentSales - lastSales;
  const salesStatus = lastSales === 0 ? "neutral" : salesDiff > 0 ? "up" : salesDiff < 0 ? "down" : "neutral";
  const salesMessage =
    salesStatus === "up"
      ? `Naik ${((salesDiff / lastSales) * 100).toFixed(1)}% dibanding bulan lalu`
      : salesStatus === "down"
        ? `Turun ${((Math.abs(salesDiff) / lastSales) * 100).toFixed(1)}% dibanding bulan lalu`
        : `Tidak ada perubahan`;

  const currentMonthProducts = await db.product.count({
    where: {
      userId,
      createdAt: { gte: startOfDay(oneMonthAgo) },
    },
  });

  const lastMonthProducts = await db.product.count({
    where: {
      userId,
      createdAt: {
        gte: startOfDay(twoMonthsAgo),
        lt: startOfDay(oneMonthAgo),
      },
    },
  });

  const productDiff = currentMonthProducts - lastMonthProducts;
  const productStatus =
    lastMonthProducts === 0 ? "neutral" : productDiff > 0 ? "up" : productDiff < 0 ? "down" : "neutral";

  const productMessage =
    productStatus === "up"
      ? `Naik ${((productDiff / lastMonthProducts) * 100).toFixed(1)}% dibanding bulan lalu`
      : productStatus === "down"
        ? `Turun ${((Math.abs(productDiff) / lastMonthProducts) * 100).toFixed(1)}% dibanding bulan lalu`
        : `Tidak ada perubahan dibanding bulan lalu`;

  // === Growth Rate ===
  const growthRate = lastSales > 0 ? ((currentSales - lastSales) / lastSales) * 100 : 0;
  const growthStatus = growthRate > 0 ? "up" : growthRate < 0 ? "down" : "neutral";
  const growthMessage =
    growthStatus === "up"
      ? "Pertumbuhan positif"
      : growthStatus === "down"
        ? "Pertumbuhan negatif"
        : "Tidak ada pertumbuhan";

  // === Chart & Table ===
  const chartData = await db.sale.groupBy({
    by: ["date"],
    _sum: { totalPrice: true },
    where: {
      date: { gte: startOfDay(threeMonthsAgo) },
      product: { userId },
    },
    orderBy: { date: "asc" },
  });

  const saleTable = await db.sale.findMany({
    where: {
      date: { gte: startOfDay(threeMonthsAgo) },
      product: { userId },
    },
    include: {
      product: true,
    },
    orderBy: { date: "desc" },
  });

  return {
    cards: {
      totalSales: {
        value: totalSalesValue,
        status: salesStatus,
        message: salesMessage,
        percentage: lastSales === 0 ? 0 : Number(((salesDiff / lastSales) * 100).toFixed(1)),
      },
      newProducts: {
        value: currentMonthProducts,
        status: productStatus,
        message: productMessage,
        percentage: lastMonthProducts === 0 ? 0 : Number(((productDiff / lastMonthProducts) * 100).toFixed(1)),
      },
      growthRate: {
        value: Number(growthRate.toFixed(2)),
        status: growthStatus,
        message: growthMessage,
        percentage: Number(growthRate.toFixed(2)),
      },
    },
    chart: chartData.map((item) => ({
      date: item.date.toISOString().split("T")[0],
      total: Number(item._sum.totalPrice ?? 0),
    })),
    table: saleTable.map((sale) => ({
      id: sale.id,
      productName: sale.product.name,
      quantity: sale.quantity,
      totalPrice: Number(sale.totalPrice),
      date: sale.date.toISOString().split("T")[0],
    })),
  };
}
