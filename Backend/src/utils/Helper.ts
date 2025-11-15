// Maps available subscription products with amount & duration (days)
export const SubscriptionProducts: Record<string, { amount: number; duration: number }> = {
  "com.codeweave.freeQuarterly": { amount: 0, duration: 90 },
  "com.codeweave.freeAnnually": { amount: 0, duration: 365 },
  "com.codeweave.proQuarterly": { amount: 499, duration: 90 },
  "com.codeweave.proAnnually": { amount: 1499, duration: 365 },
  "com.codeweave.businessQuarterly": { amount: 999, duration: 90 },
  "com.codeweave.businessAnnually": { amount: 2999, duration: 365 },
};

// Calculates adjusted days when switching plans mid-cycle
export const calculateAdjustedDays = (oldPlan: any, newPlanProductId: string): number => {
  const today = new Date();
  const oldExpiryDate = new Date(oldPlan.expiry_date);

  if (oldExpiryDate <= today) return 0;

  const oldProduct = SubscriptionProducts[oldPlan.productId];
  const newProduct = SubscriptionProducts[newPlanProductId];

  if (!oldProduct || !newProduct) {
    console.warn("Invalid product configuration for adjusted days.");
    return 0;
  }

  const oldPlanRemainingDays = (oldExpiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  const oldPlanPerDay = oldProduct.amount / oldProduct.duration;
  const newPlanPerDay = newProduct.amount / newProduct.duration;

  const oldRemainingAmount = oldPlanRemainingDays * oldPlanPerDay;
  const adjustedDays = oldRemainingAmount / newPlanPerDay;

  return Math.max(0, Math.ceil(adjustedDays));
};

// Gets geolocation details (country, city) from IP using ipapi.co
import axios from "axios";

export const getLocationFromIP = async (ip: string | null): Promise<{ country: string | null; city: string | null }> => {
  if (!ip) return { country: null, city: null };

  try {
    if (ip === "127.0.0.1" || ip === "::1") {
      return { country: "Localhost", city: "Development" };
    }

    const { data } = await axios.get(`https://ipapi.co/${ip}/json/`);
    return { country: data.country_name, city: data.city };
  } catch (error) {
    console.warn("IP geolocation lookup failed:", error);
    return { country: null, city: null };
  }
};

// Generates a QR code with an optional logo overlay in the center
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas, loadImage } from "canvas";
import QRCode from "qrcode";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateQrWithLogo = async (payload: any, qrOptions: any, logoName: string) => {
  const size = 1000;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  
  QRCode.toCanvas(canvas, payload, qrOptions); 
  
  if (logoName && logoName!=='none') {
    try {
      const logoFile = path.join(__dirname, `../assets/logo/${logoName}.png`);
      const logo = await loadImage(logoFile); 

      const logoSize = size * 0.2;
      const logoX = (size - logoSize) / 2;
      const logoY = (size - logoSize) / 2;
      
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(logoX - 10, logoY - 10, logoSize + 20, logoSize + 20);
      
      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
    } catch (err) {
      console.warn(`Logo "${logoName}" not found, skipping overlay`);
    }
  }

  return canvas.toDataURL();
};