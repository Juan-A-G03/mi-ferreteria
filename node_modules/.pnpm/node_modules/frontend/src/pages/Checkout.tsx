// src/pages/Checkout.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCarrito, CartItem, clearCarrito } from '../api/carrito';
import { createPedido } from '../api/pedidos';

export function Checkout() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [lineas, setLineas] = useState<CartItem[]>([]);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  // Al cargar, traigo el carrito
  useState(() => {
    fetchCarrito()
      .then(setLineas)
      .catch(() => setError('No pude cargar el carrito'));
  });

  const totalNeto = lineas.reduce((s, i) => s + i.subTotal, 0);
  const totalIva = Number((totalNeto * 0.21).toFixed(2));
  const totalBruto = Number((totalNeto + totalIva).toFixed(2));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const pedido = await createPedido({ usuarioNombre: nombre, usuarioEmail: email, lineas });
      // Vacío carrito en el servidor
      await clearCarrito();
      // Y navego al ticket
      navigate(`/ticket/${pedido.id}`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e instanceof Error ? e.message || 'Error creando pedido' : 'Error desconocido creando pedido');
      } else {
        setError('Error desconocido creando pedido');
      }
      setError(e instanceof Error ? e.message || 'Error creando pedido' : 'Error desconocido creando pedido');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Resumen de tu carrito</h2>
      <ul>
        {lineas.map(i => (
          <li key={i.productId}>
            {i.nombre} x {i.cantidad} = ${i.subTotal.toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Neto: ${totalNeto.toFixed(2)}</p>
      <p>IVA (21%): ${totalIva.toFixed(2)}</p>
      <p><strong>Total: ${totalBruto.toFixed(2)}</strong></p>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Nombre:{' '}
            <input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:{' '}
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Finalizar compra</button>
      </form>
    </div>
  );
}
