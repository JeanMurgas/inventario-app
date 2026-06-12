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

    const [state, action, pending] = useActionState(
        updateItem,
        undefined
    );

    return (
        <form action={action}>
            <div>

                <input
                    type="hidden"
                    name="itemId"
                    value={item.id}
                />

                <label>Nombre</label>
                <input name="name" defaultValue={item.name} />
                {state?.errors?.name && <p>{state.errors.name[0]}</p>}
            </div>

            <div>
                <label>Cantidad</label>
                <input
                    name="quantity"
                    type="number"
                    min="0"
                    max="9999"
                    defaultValue={item.quantity}
                />

                {state?.errors?.quantity && <p>{state.errors.quantity[0]}</p>}
            </div>

            <div>
                <label>Precio</label>
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={item.price}
                />
                {state?.errors?.price && <p>{state.errors.price[0]}</p>}
            </div>

            {state?.message && <p>{state.message}</p>}

            <button type="submit" disabled={pending}>
                {pending ? "Actualizando..." : "Actualizar"}
            </button>
        </form>
    );
}