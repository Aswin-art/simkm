import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { subMonths, addDays, differenceInDays } from "date-fns";

const prisma = new PrismaClient();

function getRandomDateInLast3Months() {
  const start = subMonths(new Date(), 3);
  const daysRange = differenceInDays(new Date(), start);
  const randomOffset = Math.floor(Math.random() * daysRange);
  return addDays(start, randomOffset);
}

async function main() {
  console.log("🧹 Menghapus semua data lama...");
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password", 10);

  console.log("👤 Membuat user admin...");
  await prisma.user.create({
    data: {
      name: "Admin SIMKM",
      email: "admin@gmail.com",
      password,
      phone: "081234567890",
      address: "Jalan Raya Admin No.1, Jakarta, Indonesia",
      role: Role.admin,
      createdAt: new Date(),
    },
  });

  const umkmUsers = [];

  console.log("👤 Membuat 5 user UMKM...");
  for (let i = 1; i <= 5; i++) {
    const umkm = await prisma.user.create({
      data: {
        name: `UMKM ${i}`,
        email: `umkm${i}@gmail.com`,
        password,
        phone: `0812345678${i}0`,
        address: `Jalan Raya UMKM No.${i}, Jakarta, Indonesia`,
        role: Role.umkm,
        createdAt: new Date(),
      },
    });
    umkmUsers.push(umkm);
  }

  console.log("📦 Membuat produk dan penjualan...");
  for (const umkm of umkmUsers) {
    const products = [];

    for (let i = 1; i <= 3; i++) {
      const totalProduced = Math.floor(Math.random() * 100) + 50;
      const rawMaterialCost = 8000;
      const hppPerUnit = 13000;
      const price = 20000 + i * 1000;
      const bepUnit = Math.ceil((rawMaterialCost * totalProduced) / (price - hppPerUnit));
      const product = await prisma.product.create({
        data: {
          userId: umkm.id,
          name: `Produk ${i} - ${umkm.name}`,
          price,
          rawMaterialCost,
          totalProduced,
          hppPerUnit,
          bepUnit,
          createdAt: getRandomDateInLast3Months(),
        },
      });
      products.push(product);
    }

    for (const product of products) {
      const saleCount = Math.floor(Math.random() * 6) + 5;

      for (let j = 0; j < saleCount; j++) {
        const quantity = Math.floor(Math.random() * 10) + 1;
        const totalPrice = quantity * Number(product.price);
        const saleDate = getRandomDateInLast3Months();

        await prisma.sale.create({
          data: {
            productId: product.id,
            date: saleDate,
            quantity,
            totalPrice,
            createdAt: saleDate,
          },
        });
      }
    }
  }

  console.log("✅ Seeder berhasil dijalankan.");
}

main()
  .catch((e) => {
    console.error("❌ Seeder error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
