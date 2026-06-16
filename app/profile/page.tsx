import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { requireAuth } from "../actions/auth";
import { updateOwnProfile } from "../actions/users";
import ThemeToggle from "../components/ThemeToggle";

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
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mi perfil</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Administra tu cuenta, contraseña y preferencia visual.
        </p>
      </div>

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Información de cuenta
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Actualiza tu correo o cambia tu contraseña.
          </p>
        </div>

        <form action={updateOwnProfile} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>

            <input
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              type="email"
              name="email"
              defaultValue={user.email}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nueva contraseña
            </label>

            <input
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              type="password"
              name="password"
              minLength={6}
              placeholder="Dejar vacío para no cambiar"
            />
          </div>

          <button
            className="rounded-lg bg-gray-900 px-5 py-2 font-medium text-white hover:bg-gray-800 dark:bg-gray-700 dark:text-white"
            type="submit"
          >
            Guardar cambios
          </button>
        </form>
      </section>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Apariencia</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Cambia entre modo claro y modo oscuro.
        </p>

        <div className="mt-4">
          <ThemeToggle currentTheme={user.theme} />
        </div>
      </section>
    </main>
  );
}