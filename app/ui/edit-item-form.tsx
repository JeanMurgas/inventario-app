"use client";

import { useActionState } from "react";
import { updateItem } from "../actions/items";

type Item = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

export default function EditItemForm({ item }: { item: Item }) {
  const [state, action, pending] = useActionState(updateItem, undefined);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="itemId" value={item.id} />

      <div>
        <label htmlFor={`name-${item.id}`} className="mb-2 block text-sm font-medium">
          Nombre
        </label>
        <input
          id={`name-${item.id}`}
          name="name"
          defaultValue={item.name}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 outline-none transition focus:border-slate-500"
        />
        {state?.errors?.name && (
          <p className="mt-2 text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor={`quantity-${item.id}`}
          className="mb-2 block text-sm font-medium"
        >
          Cantidad
        </label>
        <input
          id={`quantity-${item.id}`}
          name="quantity"
          type="number"
          min="0"
          max="9999"
          defaultValue={item.quantity}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 outline-none transition focus:border-slate-500"
        />
        {state?.errors?.quantity && (
          <p className="mt-2 text-sm text-red-500">
            {state.errors.quantity[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`price-${item.id}`} className="mb-2 block text-sm font-medium">
          Precio
        </label>
        <input
          id={`price-${item.id}`}
          name="price"
          type="number"
          step="0.01"
          min="0"
          defaultValue={item.price}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 outline-none transition focus:border-slate-500"
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
        className="rounded-lg border border-[#111827] bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Actualizando..." : "Actualizar"}
      </button>
    </form>
  );
}