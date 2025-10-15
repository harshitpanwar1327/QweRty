import express from 'express';
import { getQr, postQr, updateQr, updateStatus, deleteQr } from '../controllers/QrCodesControllers.js';

let router = express.Router();

router.post('/get-qr', getQr);
router.post('/qr', postQr);
router.put('/qr/:id', updateQr);
router.put('/qr-status', updateStatus);
router.delete('/qr', deleteQr);

export default router;