import express from 'express'
import { statsFilter, getStats } from '../controllers/QrStatsControllers.js'

const router = express.Router();

router.get('/stats-filter/:uid', statsFilter);
router.post('/get-stats', getStats);

export default router;