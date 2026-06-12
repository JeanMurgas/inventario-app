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
        <main>
            <h1>Mi inventario</h1>
            <p>Usuario: {user.email}</p>
            <p>Total: ${total.toFixed(2)}</p>

            <ItemForm />
            <h2>Items</h2>

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <details>
                            <summary>
                                {item.name} - Cantidad: {item.quantity} - Precio: ${item.price}
                            </summary>

                            <EditItemForm item={item} />

                            <form action={deleteItem}>
                                <input type="hidden" name="itemId" value={item.id} />
                                <button type="submit">Eliminar</button>
                            </form>
                        </details>
                    </li>
                ))}
            </ul>
        </main>
    );
}