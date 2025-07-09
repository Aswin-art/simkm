import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { subMonths, addDays, startOfMonth } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Menghapus semua data lama...");
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const passwordAdmin = await bcrypt.hash("password", 10);
  const passwordUmkm = await bcrypt.hash("password", 10);

  console.log("👤 Membuat user...");
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

  console.log("📦 Membuat 5 produk...");
  const products = [];

  for (let i = 1; i <= 5; i++) {
    const product = await prisma.product.create({
      data: {
        userId: umkm.id,
        name: `Produk ${i}`,
        description: `Deskripsi produk ${i}`,
        image: `https://via.placeholder.com/150?text=Produk+${i}`,
        price: 20000 + i * 1000,
        rawMaterialCost: 8000,
        laborCost: 3000,
        overheadCost: 2000,
        totalCost: 13000,
        unitProduced: 100,
        hppPerUnit: 13000,
        fixedCost: 200000,
        variableCostPerUnit: 13000,
        pricePerUnit: 20000 + i * 1000,
        profitMargin: 20,
        bepUnit: 20,
        createdAt: new Date(`2025-06-${(10 + i).toString().padStart(2, "0")}`),
      },
    });
    products.push(product);
  }

  console.log("🧾 Membuat 50 data penjualan...");
  const today = new Date();
  const lastMonth = startOfMonth(subMonths(today, 1));

  for (let i = 0; i < 50; i++) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomDays = Math.floor(Math.random() * 60);
    const saleDate = addDays(lastMonth, randomDays);
    const quantity = Math.floor(Math.random() * 10) + 1;
    const totalPrice = quantity * Number(randomProduct.price);

    await prisma.sale.create({
      data: {
        productId: randomProduct.id,
        date: saleDate,
        quantity,
        totalPrice,
      },
    });
  }

  console.log("✅ Seeder berhasil dijalankan.");
}

main()
  .catch((e) => {
    console.error("❌ Seeder error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
