import express from 'express';
import { getQrDetails, getQr, postStaticQr, postDynamicQr, updateQr, updateStatus, deleteQr } from '../controllers/QrCodesControllers.js';

let router = express.Router();

router.get('/qr-details/:id', getQrDetails);
router.post('/get-qr', getQr);
router.post('/static-qr', postStaticQr);
router.post('/dynamic-qr', postDynamicQr);
router.put('/qr', updateQr);
router.put('/qr-status', updateStatus);
router.delete('/qr', deleteQr);

export default router;