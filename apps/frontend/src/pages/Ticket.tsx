// src/pages/Ticket.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPedido, Pedido } from '../api/pedidos';

export function Ticket() {
  const { id } = useParams<{ id: string }>();
  const [pedido, setPedido] = useState<Pedido>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (id) {
      fetchPedido(id)
        .then(setPedido)
        .catch(() => setError('No se encontró el pedido'));
    }
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!pedido) return <p>Cargando ticket...</p>;

  return (
    <div>
      <h1>Ticket de Compra</h1>
      <p><strong>Pedido ID:</strong> {pedido.id}</p>
      <p><strong>Cliente:</strong> {pedido.usuarioNombre} ({pedido.usuarioEmail})</p>
      <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>

      <h2>Detalle</h2>
      <ul>
        {pedido.lineas.map((l, idx) => (
          <li key={idx}>
            Producto {l.productId}: {l.cantidad} × ${l.subTotal / l.cantidad} = ${l.subTotal.toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Neto: ${pedido.totalNeto.toFixed(2)}</p>
      <p>IVA (21%): ${pedido.totalIva.toFixed(2)}</p>
      <p><strong>Total: ${pedido.totalBruto.toFixed(2)}</strong></p>

      <Link to="/">← Volver al catálogo</Link>
    </div>
  );
}
