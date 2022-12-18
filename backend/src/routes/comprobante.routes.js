import {Router} from 'express'
import { getComp, postComp, putComp, deleteComp } from '../controllers/comprobante.controller.js'

const router = Router()

router.get( '/comp',getComp)

router.post( '/comp', postComp)

router.put( '/comp',putComp);

router.delete( '/comp/:id',deleteComp);


export default router;