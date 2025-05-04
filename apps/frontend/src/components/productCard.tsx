// src/components/ProductCard.tsx
import { useState } from 'react';
import { postCarrito } from '../api/carrito';

type Props = {
  id: number;
  nombre: string;
  precio_unitario: number;
};

export function ProductCard({ id, nombre, precio_unitario }: Props) {
  const [cantidad, setCantidad] = useState(1);

  const onAdd = async () => {
    try {
      const carritoActualizado = await postCarrito({
        productId: id,
        nombre,
        precioUnitario: precio_unitario,
        cantidad
      });
      console.log('Carrito:', carritoActualizado);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h4>{nombre}</h4>
      <p>Precio: ${precio_unitario}</p>
      <input
        type="number"
        min={1}
        value={cantidad}
        onChange={e => setCantidad(Number(e.target.value))}
      />
      <button onClick={onAdd}>Agregar al carrito</button>
    </div>
  );
}
