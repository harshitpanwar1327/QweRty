import express from 'express';
import { getNewQr, postNewQr, updateNewQr, deleteNewQr } from '../controllers/NewQrControllers.js';

let router = express.Router();

router.get('/new-qr/:uid', getNewQr);
router.post('/new-qr', postNewQr);
router.put('/new-qr/:id', updateNewQr);
router.delete('/new-qr/:id', deleteNewQr);

export default router;