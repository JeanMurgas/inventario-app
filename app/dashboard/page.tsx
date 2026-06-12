import { requireAuth } from "../actions/auth";

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user.email}</p>
      <p>Rol: {user.role}</p>
    </main>
  );
}