import { Router } from 'express';
import {
  obtenerCarrito,
  actualizarCarrito,
  vaciarCarrito,
} from '../controllers/cartController';

const router = Router();

router.get('/', obtenerCarrito);
router.post('/', actualizarCarrito);
router.delete('/', vaciarCarrito);

export default router;
