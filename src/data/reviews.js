// Reviews are grouped by product id.
// To add a review for a product, find its id below (or add a new key)
// and push a new object into that array.

export const reviews = {
  1: [
    { name: "Sarah J.", rating: 5, text: "Absolutely love this piece! The quality is amazing and fits perfectly.", date: "2 days ago" },
    { name: "Emma L.", rating: 4, text: "Great product, fast delivery. Will definitely order again!", date: "1 week ago" },
    { name: "Mia K.", rating: 5, text: "Exactly as shown in the picture. Very happy with my purchase.", date: "2 weeks ago" },
  ],
  2: [
    { name: "Ayesha K.", rating: 5, text: "The fabric feels premium and the stitching is really solid.", date: "3 days ago" },
    { name: "Fatima N.", rating: 4, text: "True to size, arrived earlier than expected.", date: "1 week ago" },
  ],
  3: [
    { name: "Zara M.", rating: 5, text: "This is now my favorite piece in my closet. Great quality!", date: "5 days ago" },
    { name: "Priya S.", rating: 5, text: "Customer service helped me pick the right size, fits perfectly.", date: "2 weeks ago" },
    { name: "Nida H.", rating: 4, text: "Beautiful color in person, slightly different from photos but still lovely.", date: "3 weeks ago" },
  ],
  // Add more product IDs below as you like.
};

const fallbackReviews = [
  { name: "Verified Buyer", rating: 5, text: "Great quality and true to size. Would recommend.", date: "1 week ago" },
  { name: "Verified Buyer", rating: 4, text: "Nice fabric, fast shipping. Happy with the purchase.", date: "2 weeks ago" },
];

export function getReviewsForProduct(productId) {
  return reviews[productId] && reviews[productId].length > 0
    ? reviews[productId]
    : fallbackReviews;
}

export function getAverageRating(productId) {
  const list = getReviewsForProduct(productId);
  const avg = list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  return Math.round(avg * 10) / 10;
}

export function getReviewCount(productId) {
  return getReviewsForProduct(productId).length;
}