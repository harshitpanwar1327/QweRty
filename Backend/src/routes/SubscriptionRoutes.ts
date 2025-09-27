import express from 'express';
import { getSubscriptions, postSubscriptions, updateCancelSubscriptions, updateRenewSubscriptions } from '../controllers/SubscriptionControllers.js'

let router = express.Router();

router.get('/subscription/:user_id', getSubscriptions);
router.post('/subscription', postSubscriptions);
router.put('/subscription/:id/cancel', updateCancelSubscriptions);
router.put('/subscription/:id/renew', updateRenewSubscriptions);

export default router;