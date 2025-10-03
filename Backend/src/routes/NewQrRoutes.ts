import express from 'express';
import { getNewQr, postNewQr, updateNewQr, deleteNewQr } from '../controllers/NewQrControllers.js'

let router = express.Router();

router.get('/new-qr/:user_id', getNewQr);
router.post('/new-qr', postNewQr);
router.put('/new-qr', updateNewQr);
router.delete('/new-qr/:id', deleteNewQr);

export default router;