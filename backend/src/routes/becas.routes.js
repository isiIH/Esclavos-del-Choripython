import {Router} from 'express'
import { getBecas, postBecas, putBecas, deleteBecas } from '../controllers/becas.controller.js'

const router = Router()

router.get( '/becas',getBecas)

router.post( '/becas', postBecas)

router.put( '/becas',putBecas);

router.delete( '/becas/:id',deleteBecas);


export default router;