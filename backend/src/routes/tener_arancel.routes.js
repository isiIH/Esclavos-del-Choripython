import {Router} from 'express'
import { getAr, postAr, putAr, deleteAr } from '../controllers/tener_arancel.controller.js'

const router = Router()

router.get( '/arancel',getAr)

router.post( '/arancel', postAr)

router.put( '/arancel',putAr);

router.delete( '/arancel/:año',deleteAr);


export default router;