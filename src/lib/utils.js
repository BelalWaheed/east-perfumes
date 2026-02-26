/**
 * Calculate the discounted final price.
 * finalPrice = price - (price * discount / 100)
 */
export const calcFinalPrice = (price, discount) => {
  if (!discount || discount <= 0) return Number(price);
  return Number(price) - (Number(price) * Number(discount)) / 100;
};


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
    `🕌 *TIVAQ Fragrance — New Order*`,
    `━━━━━━━━━━━━━━━━━━━`,
    `📦 *Product:* ${product.name}`,
    `🏷️ *Category:* ${product.category}`,
    `💰 *Price:* ${finalPrice?.toFixed(2)} EGP`,
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
export const formatCurrency = (amount) =>
  `${Number(amount).toFixed(2)} EGP`;


/**
 * Generate a random NFC code in the format NFC-XXXX-XXXX
 */
export const generateNfcCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No O, 0, I, 1 for readability
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `NFC-${part1}-${part2}`;
};
