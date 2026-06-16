import Link from "next/link";
import { getAllUsers, changeUserRole, deleteUser, createUserByAdmin } from "../../actions/users";
import { requireAdmin } from "../../actions/auth";

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await getAllUsers();

  return (
  <main className="mx-auto max-w-6xl px-6 py-10">
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Administrar usuarios
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Crea usuarios, cambia roles y administra cuentas registradas.
      </p>
    </div>

    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Crear usuario
      </h2>

      <form action={createUserByAdmin} className="mt-5 grid gap-4 md:grid-cols-4">
        <input
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={6}
        />

        <select
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          name="role"
          defaultValue="USER"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          className="rounded-lg bg-gray-900 px-5 py-2 font-medium text-white hover:bg-gray-800 dark:bg-gray-700"
          type="submit"
        >
          Crear usuario
        </button>
      </form>
    </section>

    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Usuarios registrados
      </h2>

      <div className="mt-5 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="break-all font-semibold text-gray-900 dark:text-white">
                  {user.email}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Rol actual: {user.role}
                </p>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <form action={changeUserRole} className="flex gap-2">
                  <input type="hidden" name="userId" value={user.id} />

                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    name="role"
                    defaultValue={user.role}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>

                  <button
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                    type="submit"
                  >
                    Actulizar rol
                  </button>
                </form>

                <form action={deleteUser} className="flex gap-2">
                  <input type="hidden" name="userId" value={user.id} />

                  <button
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    type="submit"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>
);
}