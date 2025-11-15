import express from 'express'
import { scanAnalytics, verifyPassword, getQrData } from '../controllers/QrAnalyticsControllers.js'

const router = express.Router();

router.use('/track/:id', scanAnalytics);
router.post('/verify/:id', verifyPassword);
router.get('/qrData/:id', getQrData);

export default router;