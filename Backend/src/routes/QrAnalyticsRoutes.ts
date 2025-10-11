import express from 'express'
import { scanAnalytics, verifyPassword } from '../controllers/QrAnalyticsControllers.js'

const router = express.Router();

router.use('/track/:id', scanAnalytics);
router.post('/verify/:id', verifyPassword);

export default router;