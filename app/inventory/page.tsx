import { requireAuth } from "../actions/auth";
import { deleteItem, getCurrentUserItems } from "../actions/items";
import ItemForm from "../ui/item-form";
import EditItemForm from "../ui/edit-item-form";

export default async function InventoryPage() {
    const user = await requireAuth();
    const items = await getCurrentUserItems();

    const total = items.reduce((sum, item) => {
        return sum + item.quantity * item.price;
    }, 0);

    return (
        <main className="mx-auto w-full max-w-6xl px-6 py-10">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Mi inventario</h1>
                <p className="text-sm text-muted">Usuario: {user.email}</p>
            </div>

            <section className="mb-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-sm font-medium text-muted">Total inventario</p>
                    <p className="mt-2 text-3xl font-bold">${total.toFixed(2)}</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-sm font-medium text-muted">Items registrados</p>
                    <p className="mt-2 text-3xl font-bold">{items.length}</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-sm font-medium text-muted">Unidades totales</p>
                    <p className="mt-2 text-3xl font-bold">
                        {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-[380px_1fr]">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Agregar item</h2>
                    <ItemForm />
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Items</h2>

                    {items.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-border p-8 text-center">
                            <p className="font-medium">No tienes items todavía</p>
                            <p className="mt-2 text-sm text-muted">
                                Agrega tu primer producto para comenzar.
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="rounded-xl border border-border bg-background p-4"
                                >
                                    <details>
                                        <summary className="cursor-pointer list-none rounded-lg outline-none transition hover:bg-card">
                                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-sm text-muted">
                                                        Cantidad: {item.quantity} · Precio: ${item.price}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <p className="text-sm font-semibold">
                                                        ${(item.quantity * item.price).toFixed(2)}
                                                    </p>

                                                    <span className="text-muted transition details-open:rotate-180">
                                                        ▼
                                                    </span>
                                                </div>
                                            </div>
                                        </summary>

                                        <div className="mt-5 border-t border-border pt-5">
                                            <EditItemForm item={item} />

                                            <form action={deleteItem} className="mt-4">
                                                <input type="hidden" name="itemId" value={item.id} />
                                                <button
                                                    type="submit"
                                                    className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                                >
                                                    Eliminar
                                                </button>
                                            </form>
                                        </div>
                                    </details>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </main>
    );
}