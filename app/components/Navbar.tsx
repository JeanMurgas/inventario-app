import Link from "next/link";
import { getCurrentUser, logout } from "../actions/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-border bg-card">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Inventory App
        </Link>

        <div className="flex items-center gap-2 text-sm">
          {user ? (
            <>
              <Link className="rounded-lg px-3 py-2 hover:bg-background" href="/dashboard">
                Dashboard
              </Link>

              <Link className="rounded-lg px-3 py-2 hover:bg-background" href="/inventory">
                Inventario
              </Link>

              <Link className="rounded-lg px-3 py-2 hover:bg-background" href="/profile">
                Perfil
              </Link>

              {user.role === "ADMIN" && (
                <Link className="rounded-lg px-3 py-2 hover:bg-background" href="/admin/users">
                  Usuarios
                </Link>
              )}

              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-lg border border-border px-3 py-2 hover:bg-background"
                >
                  Cerrar sesión
                </button>
              </form>
            </>
          ) : (
            <>
              <Link className="rounded-lg px-3 py-2 hover:bg-background" href="/login">
                Inicio
              </Link>

              <Link className="rounded-lg px-3 py-2 hover:bg-background" href="/signup">
                Registro
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}