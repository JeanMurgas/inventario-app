import Link from "next/link";
import { getCurrentUser } from "../actions/auth";
import { logout } from "../actions/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav>
      <Link href="/">Inicio</Link>

      {user && (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/inventory">Inventario</Link>
          <Link href="/profile">Perfil</Link>

          {user.role === "ADMIN" && (
            <Link href="/admin/users">Usuarios</Link>
          )}

          <form action={logout}>
            <button type="submit">Cerrar sesión</button>
          </form>
        </>
      )}

      {!user && (
        <>
          <Link href="/signup">Registro</Link>
        </>
      )}
    </nav>
  );
}