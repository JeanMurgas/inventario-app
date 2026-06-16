import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { requireAuth } from "../actions/auth";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const db = new PrismaClient({
  adapter,
});

export default async function DashboardPage() {
  const user = await requireAuth();

  const deleteLogs = await db.deleteLog.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      deletedAt: "desc",
    },
    take: 10,
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Revisa tu cuenta y la actividad reciente de tu inventario.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Usuario</p>
          <p className="mt-2 break-all text-lg font-semibold text-gray-900 dark:text-white">
            {user.email}
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Rol</p>
          <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
            {user.role}
          </p>
        </section>
      </div>

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Items eliminados recientemente
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Últimos registros de items eliminados de tu inventario.
          </p>
        </div>

        {deleteLogs.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Todavía no has eliminado ningún item.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {deleteLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {log.itemName}
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Eliminado el{" "}
                    {log.deletedAt.toLocaleDateString("es-PA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}