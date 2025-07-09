import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Menghapus semua data lama...");
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const passwordAdmin = await bcrypt.hash("password", 10);
  const passwordUmkm = await bcrypt.hash("password", 10);

  await prisma.user.create({
    data: {
      name: "Admin SIMKM",
      email: "admin@gmail.com",
      password: passwordAdmin,
      phone: "081234567890",
      address: "Jl. Admin No. 1",
      role: "admin",
    },
  });

  const umkm = await prisma.user.create({
    data: {
      name: "UMKM Jaya",
      email: "umkm@gmail.com",
      password: passwordUmkm,
      phone: "089876543210",
      address: "Jl. UMKM No. 2",
      role: "umkm",
    },
  });

  const product = await prisma.product.create({
    data: {
      user: {
        connect: { id: umkm.id },
      },
      name: "Kopi Tubruk",
      description: "Kopi lokal asli Indonesia",
      image: "https://example.com/image.jpg",
      price: 25000,
      rawMaterialCost: 8000,
      laborCost: 3000,
      overheadCost: 2000,
      totalCost: 13000,
      unitProduced: 100,
      hppPerUnit: 13000,
      fixedCost: 200000,
      variableCostPerUnit: 13000,
      pricePerUnit: 25000,
      profitMargin: 20,
      bepUnit: 20,
    },
  });

  await prisma.sale.create({
    data: {
      product: {
        connect: { id: product.id },
      },
      date: new Date("2025-07-01"),
      quantity: 10,
      totalPrice: 250000,
    },
  });

  console.log("✅ Seeder berhasil dijalankan.");
}

main()
  .catch((e) => {
    console.error("❌ Seeder error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
