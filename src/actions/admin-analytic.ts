"use server";

import { db } from "@/lib/db";
import { subMonths, startOfDay } from "date-fns";

export async function getAdminDashboardAnalytics() {
  const now = new Date();
  const threeMonthsAgo = startOfDay(subMonths(now, 3));
  const twoMonthsAgo = startOfDay(subMonths(now, 2));
  const oneMonthAgo = startOfDay(subMonths(now, 1));

  // === Penjualan ===
  const totalSales = await db.sale.aggregate({
    _sum: { totalPrice: true },
    where: {
      date: { gte: threeMonthsAgo },
    },
  });

  const lastMonthSales = await db.sale.aggregate({
    _sum: { totalPrice: true },
    where: {
      date: {
        gte: twoMonthsAgo,
        lt: oneMonthAgo,
      },
    },
  });

  const currentMonthSales = await db.sale.aggregate({
    _sum: { totalPrice: true },
    where: {
      date: { gte: oneMonthAgo },
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

  // === Produk ===
  const currentMonthProducts = await db.product.count({
    where: {
      createdAt: { gte: oneMonthAgo },
    },
  });

  const lastMonthProducts = await db.product.count({
    where: {
      createdAt: {
        gte: twoMonthsAgo,
        lt: oneMonthAgo,
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

  // === Chart: Group by date manually ===
  const rawSales = await db.sale.findMany({
    where: {
      date: { gte: threeMonthsAgo },
    },
    select: {
      date: true,
      totalPrice: true,
    },
    orderBy: { date: "asc" },
  });

  const chartMap = new Map<string, number>();
  for (const sale of rawSales) {
    const dateKey = sale.date.toISOString().split("T")[0];
    const currentTotal = chartMap.get(dateKey) ?? 0;
    chartMap.set(dateKey, currentTotal + Number(sale.totalPrice));
  }

  const chart = Array.from(chartMap.entries()).map(([date, total]) => ({
    date,
    total,
  }));

  // === Table ===
  const saleTable = await db.sale.findMany({
    where: {
      date: { gte: threeMonthsAgo },
    },
    include: {
      product: {
        include: {
          user: true,
        },
      },
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
    chart,
    table: saleTable.map((sale) => ({
      id: sale.id,
      umkmName: sale.product.user.name,
      productName: sale.product.name,
      quantity: sale.quantity,
      totalPrice: Number(sale.totalPrice),
      date: sale.date.toISOString().split("T")[0],
    })),
  };
}
