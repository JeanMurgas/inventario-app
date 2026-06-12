"use client";

import { useActionState } from "react";
import { createItem } from "../actions/items";

export default function ItemForm() {
  const [state, action, pending] = useActionState(createItem, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Nombre</label>
        <input id="name" name="name" type="text" />
        {state?.errors?.name && <p>{state.errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="quantity">Cantidad</label>
        <input id="quantity" name="quantity" type="number" min="0" max="9999" />
        {state?.errors?.quantity && <p>{state.errors.quantity[0]}</p>}
      </div>

      <div>
        <label htmlFor="price">Precio</label>
        <input id="price" name="price" type="number" step="0.01" min="0" />
        {state?.errors?.price && <p>{state.errors.price[0]}</p>}
      </div>

      {state?.message && <p>{state.message}</p>}

      <button type="submit" disabled={pending}>
        {pending ? "Guardando..." : "Agregar item"}
      </button>
    </form>
  );
}