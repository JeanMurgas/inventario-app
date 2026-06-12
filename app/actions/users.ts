"use server";

import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient, Role } from "../generated/prisma/client";
import { requireAdmin, requireAuth } from "./auth";
import { revalidatePath } from "next/cache";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const db = new PrismaClient({
  adapter,
});

const users = db.user;

export async function getAllUsers() {
  await requireAdmin();

  return users.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function changeUserRole(formData: FormData) {
  await requireAdmin();

  const userId = Number(formData.get("userId"));
  const role = formData.get("role") as Role;

  if (!userId) return;

  await users.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });

  revalidatePath("/admin/users");
}

export async function deleteUser(formData: FormData) {
  await requireAdmin();

  const userId = Number(formData.get("userId"));

  if (!userId) return;

  await users.delete({
    where: {
      id: userId,
    },
  });

  revalidatePath("/admin/users");
}

export async function createUserByAdmin(formData: FormData) {
  await requireAdmin();

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const role = formData.get("role") as Role;

  if (!email || !password || password.length < 6) {
    return;
  }

  const existingUser = await users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await users.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

  revalidatePath("/admin/users");
}

