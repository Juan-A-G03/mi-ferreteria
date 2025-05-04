import { RequestHandler } from 'express';
import { CartItem } from '../models/cart';

let carrito: CartItem[] = [];

// GET /carrito
export const obtenerCarrito: RequestHandler = (_req, res) => {
  res.json(carrito);
  return;
};

// POST /carrito — agrega o actualiza un ítem
export const actualizarCarrito: RequestHandler = (req, res) => {
  const { productId, nombre, precioUnitario, cantidad } = req.body as {
    productId: number;
    nombre: string;
    precioUnitario: number;
    cantidad: number;
  };
  if (
    productId == null ||
    !nombre ||
    precioUnitario == null ||
    cantidad == null
  ) {
    res.status(400).json({ error: 'Faltan datos obligatorios en el ítem' });
    return;
  }

  const subTotal = precioUnitario * cantidad;
  const idx = carrito.findIndex((i) => i.productId === productId);
  if (idx >= 0) {
    carrito[idx] = { productId, nombre, precioUnitario, cantidad, subTotal };
  } else {
    carrito.push({ productId, nombre, precioUnitario, cantidad, subTotal });
  }

  res.json(carrito);
};

// DELETE /carrito — vacía el carrito
export const vaciarCarrito: RequestHandler = (_req, res) => {
  carrito = [];
  res.sendStatus(204);
};
