import {Router} from 'express'
import { getEstud, postEstud, putEstud, deleteEstud } from '../controllers/estudiante.controller.js'

const router = Router()

router.get( '/estudiante',getEstud)

router.post( '/estudiante', postEstud)

router.put( '/estudiante',putEstud);

router.delete( '/estudiante/:rut',deleteEstud);


export default router;