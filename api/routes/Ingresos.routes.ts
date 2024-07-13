import { Router } from 'express';

import { ObtenerIngresos, PostIngresos , UpdateIngresos , ObtenerConceptos, ObtenerSegmentos, ObtenerCategorias, ObtenerSubcategorias, ObtenerUsuarios, ObtenerCombinaciones, ObtenerEstatus } from '../controllers/Ingresos.controllers';

const router = Router();

//modulo ingresos
router.get('/GetIngresos', ObtenerIngresos);
router.post('/PostIngresos', PostIngresos);
router.put('/UpdateIngresos', UpdateIngresos);

//Conceptos
router.get('/GetConceptos', ObtenerConceptos);

// Segmentos
router.get('/GetSegmentos', ObtenerSegmentos);

// Categorias
router.get('/GetCategorias', ObtenerCategorias);

// Subcategorias
router.get('/GetSubcategorias', ObtenerSubcategorias);

// Usuarios
router.get('/GetUsuarios', ObtenerUsuarios);

// Combinaciones
router.get('/GetCombinaciones', ObtenerCombinaciones);

// Estatus
router.get('/GetEstatus', ObtenerEstatus);


export default router;