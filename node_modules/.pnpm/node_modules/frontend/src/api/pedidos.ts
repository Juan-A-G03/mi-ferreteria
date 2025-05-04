import { CartItem } from './carrito';

export type Pedido = {
  id: string;
  usuarioNombre: string;
  usuarioEmail: string;
  fecha: string;
  totalNeto: number;
  totalIva: number;
  totalBruto: number;
  lineas: CartItem[];
};

const BASE = (import.meta as ImportMeta & { env: { VITE_API_BASE_URL: string } }).env.VITE_API_BASE_URL;

export async function createPedido(payload: {
  usuarioNombre: string;
  usuarioEmail: string;
  lineas: CartItem[];
}): Promise<Pedido> {
  const res = await fetch(`${BASE}/pedidos`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error creando pedido');
  return res.json();
}

export async function fetchPedido(id: string): Promise<Pedido> {
  const res = await fetch(`${BASE}/pedidos/${id}`);
  if (!res.ok) throw new Error('Pedido no encontrado');
  return res.json();
}
