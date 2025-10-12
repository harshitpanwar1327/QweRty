import express from 'express';
import { getNewQr, postNewQr, updateNewQr, deleteNewQr } from '../controllers/QrCodesControllers.js';

let router = express.Router();

router.post('/get-qr', getNewQr);
router.post('/qr', postNewQr);
router.put('/qr/:id', updateNewQr);
router.delete('/qr/:id', deleteNewQr);

export default router;