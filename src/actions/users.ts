"use server";

import { db } from "@/lib/db";
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
