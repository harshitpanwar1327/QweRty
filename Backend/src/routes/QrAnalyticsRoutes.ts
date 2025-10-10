import express from 'express'
import { postAnalytics } from '../controllers/QrAnalyticsControllers.js'

const router = express.Router();

router.use('/track/:id', postAnalytics);

export default router;