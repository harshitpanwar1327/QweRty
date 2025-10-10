import express from 'express';
import { getNewQr, postNewQr, updateNewQr, deleteNewQr } from '../controllers/QrCodesControllers.js';

let router = express.Router();

router.get('/qr-codes/:uid', getNewQr);
router.post('/qr-codes', postNewQr);
router.put('/qr-codes/:id', updateNewQr);
router.delete('/qr-codes/:id', deleteNewQr);

export default router;