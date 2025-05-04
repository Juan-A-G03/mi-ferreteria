import { Request, Response } from 'express';
import { db } from '../db/connection';
import { Categoria } from '../models/categoria';

export const listarCategorias = (_req: Request, res: Response) => {
  db.all<Categoria[]>(`SELECT * FROM categoria`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

export const crearCategoria = (req: Request, res: Response): void => {
    const { nombre } = req.body as Categoria;
    if (!nombre) {
      res.status(400).json({ error: 'El nombre es requerido' });
      return;
    }
    db.run(
      `INSERT INTO categoria (nombre) VALUES (?)`,
      [nombre],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(201).json({ id: this.lastID, nombre });
      }
    );
  };
