import { Request, Response, RequestHandler } from 'express';
import { db } from '../db/connection';
import { Pedido, LineaPedido } from '../models/pedido';
import { CartItem } from '../models/cart';
import { v4 as uuidv4 } from 'uuid';

export const crearPedido: RequestHandler = (req, res) => {
    const { usuarioNombre, usuarioEmail, lineas } = req.body as {
      usuarioNombre: string;
      usuarioEmail: string;
      lineas: CartItem[];
    };
    if (!usuarioNombre || !lineas?.length) {
      res.status(400).json({ error: 'Datos de pedido incompletos' });
      return;
    }

  // Cálculos
  const totalNeto = lineas.reduce((sum, i) => sum + i.subTotal, 0);
  const totalIva = Number((totalNeto * 0.21).toFixed(2));
  const totalBruto = Number((totalNeto + totalIva).toFixed(2));
  const pedidoId = uuidv4();
  const fecha = new Date().toISOString();

  db.serialize(() => {
    // Insertar cabecera
    db.run(
      `INSERT INTO pedido(id, usuario_nombre, usuario_email, fecha, total_neto, total_iva, total_bruto)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [pedidoId, usuarioNombre, usuarioEmail, fecha, totalNeto, totalIva, totalBruto],
      (err: Error | null) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (err) return res.status(500).json({ error: (err as Error).message });

        // Insertar líneas
        const stmt = db.prepare(
          `INSERT INTO linea_pedido(pedido_id, producto_id, cantidad, sub_total) VALUES (?, ?, ?, ?)`
        );
        for (const item of lineas) {
          stmt.run(pedidoId, item.productId, item.cantidad, item.subTotal);
        }
        stmt.finalize(() => {
          // Devolver ticket
          const ticket: Pedido & { lineas: LineaPedido[] } = {
            id: pedidoId,
            usuarioNombre,
            usuarioEmail,
            fecha,
            totalNeto,
            totalIva,
            totalBruto,
            lineas: lineas.map((i) => ({
              pedidoId,
              productoId: i.productId,
              cantidad: i.cantidad,
              subTotal: i.subTotal,
            })),
          };
          res.status(201).json(ticket);
        });
      }
    );
  });
}

export const obtenerPedido: RequestHandler = (req, res) => {
    const { id } = req.params;

    db.get<Pedido>(
      `SELECT * FROM pedido WHERE id = ?`,
      [id],
      (err, pedido) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (!pedido) {
          res.status(404).json({ error: 'Pedido no encontrado' });
          return;
        }

        db.all<LineaPedido[]>(
          `SELECT * FROM linea_pedido WHERE pedido_id = ?`,
          [id],
          (err2, lineas) => {
            if (err2) {
              res.status(500).json({ error: err2.message });
              return;
            }
            res.json({ ...pedido, lineas });
          }
        );
      }
    );
};
