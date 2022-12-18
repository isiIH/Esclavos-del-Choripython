import {Router} from 'express'
import { getProg, postProg, putProg, deleteProg } from '../controllers/programa.controller.js'

const router = Router()

router.get( '/prog',getProg)

router.post( '/prog', postProg)

router.put( '/prog',putProg);

router.delete( '/prog/:id',deleteProg);


export default router;

