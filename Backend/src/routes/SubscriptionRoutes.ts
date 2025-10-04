import express from 'express';
import { getSubscriptions, postSubscription } from '../controllers/SubscriptionControllers.js';

let router = express.Router();

router.post('/subscription', postSubscription);
router.get('/subscription/:uid', getSubscriptions);

export default router;