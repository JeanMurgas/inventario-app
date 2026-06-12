import { getAllUsers, changeUserRole, deleteUser, createUserByAdmin } from "../../actions/users";
import { requireAdmin } from "../../actions/auth";

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await getAllUsers();

  return (
    <main>
      <h1>Administrar usuarios</h1>

      <ul>
        <form action={createUserByAdmin}>
          <h2>Crear usuario</h2>

          <input name="email" type="email" placeholder="Email" required />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={6}
          />

          <select name="role" defaultValue="USER">
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button type="submit">Crear usuario</button>
        </form>
        {users.map((user) => (
          <li key={user.id}>
            <p>
              {user.email} - {user.role}
            </p>

            <form action={changeUserRole}>
              <input
                type="hidden"
                name="userId"
                value={user.id}
              />

              <select
                name="role"
                defaultValue={user.role}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>

              <button type="submit">
                Cambiar rol
              </button>
            </form>

            <form action={deleteUser}>
              <input
                type="hidden"
                name="userId"
                value={user.id}
              />

              <button type="submit">
                Eliminar
              </button>
            </form>

            <hr />
          </li>
        ))}
      </ul>
    </main>
  );
}