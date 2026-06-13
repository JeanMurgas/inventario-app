// export async function signup(formData: FormData) {}
"use server";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient, Role } from "../generated/prisma/client";
/// IMPORTS FOR LOGIN
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { SignupFormSchema, FormState, LoginFormSchema } from "../lib/definitions";
/// IMPORT FOR REQUIRE AUTH
import { redirect } from "next/navigation";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const db = new PrismaClient({
  adapter,
});

const users = db.user

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Campos Inválidos. Por favor corrige los errores e intenta de nuevo."
        }

        
    }

    // Call the provider or db to create a user...
    // 2. Prepare data for insertion into database
  const {email, password } = validatedFields.data
  const existingUser = await users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["Este correo ya está registrado."],
      },
      message: "El correo ya existe.",
    };
  }
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
 
  // 3. Insert the user into the database
  try {
    await users.create({
      data: {
        email,
        password: hashedPassword,
        role: Role.USER,
      },
    });

    return {
      success: true,
      message: "Usuario creado correctamente.",
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      message: "Ocurrió un error al crear la cuenta.",
    };
  }
}


/// FUNCTION LOGIN 

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos.",
    };
  }

  const { email, password } = validatedFields.data;

  const user = await users.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      message: "Correo o contraseña incorrectos.",
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      message: "Correo o contraseña incorrectos.",
    };
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: number;
      email: string;
      role: Role;
    };

    const user = await users.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        theme: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== Role.ADMIN) {
    redirect("/dashboard");
  }

  return user;
}