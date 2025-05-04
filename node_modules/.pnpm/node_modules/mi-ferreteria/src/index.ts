import express, { Request, Response } from 'express';
import { db } from './db/connection';
import { initDB } from './db/init';
import categoriaRoutes from './routes/categoriaRoutes';
import cartRoutes from './routes/cartRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import cors from 'cors';



const app = express();
const PORT = 3000;
app.use(cors());           // <— así permites peticiones desde cualquier origen
app.use(express.json());

// Inicializamos las tablas
initDB();

app.get('/', (_req: Request, res: Response) => {
  res.send('¡Backend de la ferretería conectado y BD lista!');
});

// --- rutas vendrán aquí ---
app.use('/categorias', categoriaRoutes);

app.use('/carrito', cartRoutes);

app.use('/pedidos', pedidoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
