const SubscriptionProducts: Record<string, { amount: number; duration: number }> = {
  'com.codeweave.freeQuarterly' : {
    amount: 0,
    duration: 90
  },
  'com.codeweave.freeAnnually' : {
    amount: 0,
    duration: 365
  },
  'com.codeweave.proQuarterly' : {
    amount: 499,
    duration: 90
  },
  'com.codeweave.proAnnually' : {
    amount: 1499,
    duration: 365
  },
  'com.codeweave.businessQuarterly' : {
    amount: 999,
    duration: 90
  },
  'com.codeweave.businessAnnually' : {
    amount: 2999,
    duration: 365
  }
}

export const calculateAdjustedDays = (oldPlan: any, newPlanProductId: string): number => {
  const today = new Date();

  const oldExpiryDate = new Date(oldPlan.expiry_date);
  const oldPlanPerDay = SubscriptionProducts[oldPlan.productId].amount/SubscriptionProducts[oldPlan.productId].duration;
  const oldPlanRemainingDays = (oldExpiryDate.getTime() - today.getTime())/(1000 * 60 * 60 * 24);
  const oldRemainingAmount = oldPlanRemainingDays * oldPlanPerDay;
  
  const newPlanPerDay = SubscriptionProducts[newPlanProductId].amount/SubscriptionProducts[newPlanProductId].duration;

  return Math.ceil(oldRemainingAmount/newPlanPerDay);
}