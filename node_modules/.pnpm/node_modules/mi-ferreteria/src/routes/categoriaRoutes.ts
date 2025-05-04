import { Router } from 'express';
import { listarCategorias, crearCategoria } from '../controllers/categoriaController';

const router = Router();

router.get('/', listarCategorias);
router.post('/', crearCategoria);

export default router;
