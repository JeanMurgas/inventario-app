"use server";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { ItemFormSchema, ItemFormState } from "../lib/definitions";
import { requireAuth } from "./auth";
import { revalidatePath } from "next/cache";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL!,
});

const db = new PrismaClient({
    adapter,
});

const items = db.item;

//////// AGREGAR ITEM

export async function createItem(
    state: ItemFormState,
    formData: FormData
): Promise<ItemFormState> {
    const user = await requireAuth();

    const validatedFields = ItemFormSchema.safeParse({
        name: formData.get("name"),
        quantity: formData.get("quantity"),
        price: formData.get("price"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Corrige los errores del formulario.",
        };
    }

    const { name, quantity, price } = validatedFields.data;

    try {
        await items.create({
            data: {
                name,
                quantity,
                price,
                userId: user.id,
            },
        });

        return {
            success: true,
            message: "Item creado correctamente.",
        };
    } catch (error) {
        console.error(error);

        return {
            message: "No se pudo crear el item.",
        };
    }
}

/////// GetCurrentUserItem

export async function getCurrentUserItems() {
    const user = await requireAuth();

    const userItems = await items.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return userItems;
}

export async function deleteItem(formData: FormData) {
    const user = await requireAuth();

    const itemId = Number(formData.get("itemId"));

    if (!itemId) {
        return;
    }

    const item = await items.findFirst({
        where: {
            id: itemId,
            userId: user.id,
        },
    });

    if (!item) {
        return;
    }

    await db.deleteLog.create({
        data: {
            userId: user.id,
            itemName: item.name,
        },
    });

    await items.delete({
        where: {
            id: item.id,
        },
    });

    revalidatePath("/inventory");
}

export async function updateItem(
    state: ItemFormState,
    formData: FormData
): Promise<ItemFormState> {
    const user = await requireAuth();
    const itemId = Number(formData.get("itemId"));

    if (!itemId) {
        return {
            message: "ID de item inválido.",
        };
    }

    const validatedFields = ItemFormSchema.safeParse({
        name: formData.get("name"),
        quantity: formData.get("quantity"),
        price: formData.get("price"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Corrige los errores del formulario.",
        };
    }

    const item = await items.findFirst({
        where: {
            id: itemId,
            userId: user.id,
        },
    });

    if (!item) {
        return {
            message: "Item no encontrado.",
        };
    }

    const { name, quantity, price } = validatedFields.data;

    try {
        await items.update({
            where: {
                id: item.id,
            },
            data: {
                name,
                quantity,
                price,
            },
        });

        revalidatePath("/inventory");

        return {
            success: true,
            message: "Item actualizado correctamente.",
        };
    } catch (error) {
        console.error(error);

        return {
            message: "No se pudo actualizar el item.",
        };
    }
}