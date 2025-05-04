// src/pages/Cart.tsx
import { useEffect, useState } from 'react';
import { fetchCarrito, CartItem, clearCarrito } from '../api/carrito';

export function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCarrito().then(setItems);
  }, []);

  const onClear = async () => {
    await clearCarrito();
    setItems([]);
  };

  return (
    <div>
      <h1>Tu Carrito</h1>
      {items.map(i => (
        <div key={i.productId}>
          {i.nombre} x {i.cantidad} = ${i.subTotal.toFixed(2)}
        </div>
      ))}
      <button onClick={onClear}>Vaciar Carrito</button>
    </div>
  );
}
