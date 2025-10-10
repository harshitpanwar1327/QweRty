import axios from "axios";

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

  if (oldExpiryDate <= today) return 0;

  const oldProduct = SubscriptionProducts[oldPlan.productId];
  const newProduct = SubscriptionProducts[newPlanProductId];

  if (!oldProduct || !newProduct || !oldProduct.duration || !newProduct.duration) {
    console.warn("Invalid product configuration for adjusted days.");
    return 0;
  }

  const oldPlanRemainingDays = (oldExpiryDate.getTime() - today.getTime())/(1000 * 60 * 60 * 24);

  const oldPlanPerDay = oldProduct.amount / oldProduct.duration;
  const newPlanPerDay = newProduct.amount / newProduct.duration;

  const oldRemainingAmount = oldPlanRemainingDays * oldPlanPerDay;
  const adjustedDays = oldRemainingAmount / newPlanPerDay;

  return Math.max(0, Math.ceil(adjustedDays));
}

export const getLocationFromIP = async (ip: string | null) => {
  if (!ip) return { country: null, city: null };
  
  try {
    if (!ip || ip === "127.0.0.1" || ip === "::1") {
      return { country: "Localhost", city: "Development" };
    }
    
    const { data } = await axios.get(`https://ipapi.co/${ip}/json/`);
    return { country: data.country_name, city: data.city };
  } catch {
    console.warn("IP geolocation lookup failed");
    return { country: null, city: null };
  }
};