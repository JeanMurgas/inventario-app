import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { requireAuth } from "../actions/auth";
import { updateOwnProfile } from "../actions/users";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const db = new PrismaClient({
  adapter,
});

export default async function ProfilePage() {
  const currentUser = await requireAuth();

  const user = await db.user.findUnique({
    where: {
      id: currentUser.id,
    },
  });

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <main>
      <h1>Mi perfil</h1>

      <form action={updateOwnProfile}>
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            defaultValue={user.email}
            required
          />
        </div>

        <div>
          <label>Nueva contraseña</label>

          <input
            type="password"
            name="password"
            minLength={6}
            placeholder="Dejar vacío para no cambiar"
          />
        </div>

        <button type="submit">
          Guardar cambios
        </button>
      </form>
    </main>
  );
}