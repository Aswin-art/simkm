"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function loginAction(data: { email: string; password: string; remember?: boolean }) {
  const { email, password } = data;

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return { error: "Email tidak ditemukan" };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { error: "Password salah" };
  }

  const cookieStore = await cookies();
  const fakeToken = `${user.id}-${Date.now()}`;

  cookieStore.set("auth-token", fakeToken, {
    httpOnly: true,
    path: "/",
    secure: true,
  });

  cookieStore.set("role", user.role, {
    httpOnly: true,
    path: "/",
    secure: true,
  });

  if (user.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/umkm");
  }
}

export async function registerAction(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}) {
  const role = "umkm";
  const { name, email, password, phone, address } = data;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Email sudah digunakan." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    },
  });

  const cookieStore = await cookies();
  const fakeToken = `${newUser.id}-${Date.now()}`;

  cookieStore.set("auth-token", fakeToken, {
    httpOnly: true,
    path: "/",
    secure: true,
  });

  cookieStore.set("role", newUser.role, {
    httpOnly: true,
    path: "/",
    secure: true,
  });

  redirect("/umkm");
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.set("auth-token", "", { path: "/", maxAge: 0 });
  cookieStore.set("role", "", { path: "/", maxAge: 0 });

  redirect("/auth/login");
}
