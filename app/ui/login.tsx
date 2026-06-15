"use client";

import { login } from "../actions/auth";
import { useActionState } from "react";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-muted">
          Accede a tu inventario y gestiona tus productos.
        </p>
      </div>

      <form action={action} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@test.com"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-slate-500"
          />

          {state?.errors?.email && (
            <p className="mt-2 text-sm text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Contraseña
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-slate-500"
          />

          {state?.errors?.password && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {state?.message && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          {pending ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </section>
  );
}