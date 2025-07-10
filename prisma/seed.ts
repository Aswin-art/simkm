import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { subMonths, addDays, differenceInDays } from "date-fns";

const prisma = new PrismaClient();

function getRandomDateInLast3Months() {
  const start = subMonths(new Date(), 3);
  const daysRange = differenceInDays(new Date(), start);
  const randomOffset = Math.floor(Math.random() * daysRange);
  return addDays(start, randomOffset);
}

function generateLongAddress(index: number) {
  return `Jalan Raya UMKM No.${index}, RT 0${index}/RW 0${index}, Kelurahan Inovasi, Kecamatan Mandiri, Kota Usaha Produktif, Provinsi Kreatif Indonesia`;
}

function generateLongDescription(productIndex: number, umkmName: string) {
  return `Produk ${productIndex} dari ${umkmName} ini adalah hasil karya UMKM lokal yang dibuat dengan bahan baku pilihan dan melalui proses produksi yang higienis dan berkualitas tinggi. Cocok untuk digunakan sehari-hari ataupun sebagai oleh-oleh khas daerah. Didesain untuk memenuhi kebutuhan masyarakat modern dengan sentuhan kearifan lokal yang kuat.`;
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
      address: generateLongAddress(0),
      role: "admin",
      createdAt: getRandomDateInLast3Months(),
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
        address: generateLongAddress(i),
        role: "umkm",
        createdAt: getRandomDateInLast3Months(),
      },
    });
    umkmUsers.push(umkm);
  }

  console.log("📦 Membuat produk dan penjualan...");
  for (const umkm of umkmUsers) {
    const productCount = Math.floor(Math.random() * 4) + 2;
    const products = [];

    for (let i = 1; i <= productCount; i++) {
      const product = await prisma.product.create({
        data: {
          userId: umkm.id,
          name: `Produk ${i} - ${umkm.name}`,
          description: generateLongDescription(i, umkm.name),
          image: `https://cdn0-production-images-kly.akamaized.net/6wGZdyRKl8yHa0wtTzz0jzTZTG4=/0x189:5472x3273/800x450/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3492807/original/096779400_1624596661-shutterstock_1146053219.jpg`,
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
          createdAt: getRandomDateInLast3Months(),
        },
      });
      products.push(product);
    }

    for (const product of products) {
      const saleCount = Math.floor(Math.random() * 9) + 2;

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
