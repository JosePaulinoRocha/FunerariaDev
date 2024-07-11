import { Router } from 'express';

import { ObtenerIngresos, ObtenerConceptos } from '../controllers/Ingresos.controllers';

const router = Router();

//modulo ingresos
router.get('/GetIngresos', ObtenerIngresos);

//Conceptos
router.get('/GetConceptos', ObtenerConceptos);


export default router;