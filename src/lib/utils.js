/**
 * Calculate the discounted final price.
 * finalPrice = price - (price * discount / 100)
 */
export const calcFinalPrice = (price, discount) => {
  if (!discount || discount <= 0) return Number(price);
  return Number(price) - (Number(price) * Number(discount)) / 100;
};

/**
 * Points earned on purchase.
 * 1 EGP = 1 Point
 */
export const calcPointsEarned = (finalPrice) => Math.floor(finalPrice);

/**
 * Discount value from points.
 * 1 point = 0.5 EGP
 */
export const pointsToEgp = (points) => points * 0.5;

/**
 * Max points a user can redeem for a given order.
 * Cannot redeem more than availablePoints and cannot exceed order value.
 */
export const maxRedeemablePoints = (finalPrice, availablePoints) => {
  const maxByValue = Math.floor(finalPrice / 0.5); // cannot over-discount
  return Math.min(availablePoints, maxByValue);
};

/**
 * Generate a WhatsApp order link pre-filled with product info.
 */
export const generateWhatsAppLink = (product, finalPrice, pointsUsed = 0) => {
  const phone = import.meta.env.VITE_WHATSAPP_PHONE || '201000000000';
  const payable = finalPrice - pointsToEgp(pointsUsed);
  const lines = [
    `🕌 *East Perfumes — New Order*`,
    `━━━━━━━━━━━━━━━━━━━`,
    `📦 *Product:* ${product.name}`,
    `🏷️ *Category:* ${product.category}`,
    `💰 *Price:* ${finalPrice.toFixed(2)} EGP`,
    pointsUsed > 0
      ? `🎁 *Points Redeemed:* ${pointsUsed} pts (−${pointsToEgp(pointsUsed).toFixed(2)} EGP)`
      : null,
    `💳 *Total Payable:* ${payable.toFixed(2)} EGP`,
    `━━━━━━━━━━━━━━━━━━━`,
    `Please confirm my order. Thank you! 🌹`,
  ]
    .filter(Boolean)
    .join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
};

/**
 * Format a number as Egyptian currency.
 */
export const formatEGP = (amount) =>
  `${Number(amount).toFixed(2)} EGP`;

/**
 * Truncate a string to a max length.
 */
export const truncate = (str, max = 80) =>
  str && str.length > max ? str.slice(0, max) + '…' : str;
