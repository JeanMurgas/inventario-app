"use client";

import { useActionState } from "react";
import { createItem } from "../actions/items";

export default function ItemForm() {
  const [state, action, pending] = useActionState(createItem, undefined);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ej. Laptop"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-slate-500"
        />
        {state?.errors?.name && (
          <p className="mt-2 text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
          Cantidad
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min="0"
          max="9999"
          placeholder="0"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-slate-500"
        />
        {state?.errors?.quantity && (
          <p className="mt-2 text-sm text-red-500">
            {state.errors.quantity[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="mb-2 block text-sm font-medium">
          Precio
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-slate-500"
        />
        {state?.errors?.price && (
          <p className="mt-2 text-sm text-red-500">{state.errors.price[0]}</p>
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
        className="w-full rounded-lg border border-[#111827] bg-[#111827] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Agregar item"}
      </button>
    </form>
  );
}