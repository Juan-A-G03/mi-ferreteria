import { Router } from 'express';
import { crearPedido, obtenerPedido } from '../controllers/pedidoController';

const router = Router();

router.post('/', crearPedido);
router.get('/:id', obtenerPedido);

export default router;
