import {Router} from 'express'
import { getC, postC, putC, deleteC } from '../controllers/cuenta.controller.js'

const router = Router()

router.get( '/cuenta',getC)

router.post( '/cuenta', postC)

router.put( '/cuenta',putC);

router.delete( '/cuenta/:id',deleteC);


export default router;