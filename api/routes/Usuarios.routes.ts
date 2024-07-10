import { Router } from 'express';
import { ObtenerUsuarios, PostUsers, UpdateUser, Login  } from '../controllers/Usuarios.controller';

const router = Router();

//modulo usuarios
router.get('/GetUsuarios', ObtenerUsuarios);
router.post('/PostUsers', PostUsers);
router.put('/UpdateUser', UpdateUser);

//login
router.post('/login', Login);

export default router;
