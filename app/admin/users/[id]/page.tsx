import { notFound } from "next/navigation";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient, Role } from "../../../generated/prisma/client";
import { requireAdmin } from "../../../actions/auth";
import { updateUser } from "../../../actions/users";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL!,
});

const db = new PrismaClient({
    adapter,
});

export default async function EditUserPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    await requireAdmin();

    const { id } = await params;

    const user = await db.user.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!user) {
        notFound();
    }

    return (
        <main
            style={{
                maxWidth: "500px",
                margin: "40px auto",
                padding: "20px",
                border: "1px solid #333",
                borderRadius: "10px",
            }}
        >
            <h1>Editar usuario</h1>

            <form
                action={updateUser}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <input
                    type="hidden"
                    name="userId"
                    value={user.id}
                />

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    required
                    style={{
                        padding: "8px",
                    }}
                />

                <label>Role</label>

                <select
                    name="role"
                    defaultValue={user.role}
                    style={{
                        padding: "8px",
                    }}
                >
                    <option value="USER">
                        USER
                    </option>

                    <option value="ADMIN">
                        ADMIN
                    </option>
                </select>

                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        cursor: "pointer",
                    }}
                >
                    Guardar cambios
                </button>
            </form>
        </main>
    );
}