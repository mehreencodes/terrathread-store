// Stock levels per product per size.
// To set a specific stock number for a product+size, add an entry below.
// If a product/size isn't listed here, a consistent "random" number
// is generated automatically (same product+size always shows the same number).

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Manually override specific product/size stock here if needed.
// Example: product id 1, size M has only 2 left, size L is out of stock (0)
const manualStock = {
  1: { M: 2, L: 0 },
  3: { S: 4, XL: 1 },
};

// Simple deterministic pseudo-random number generator based on a string seed,
// so the same product+size always returns the same stock number
// (instead of changing every time the page reloads).
function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 100;
}

export function getStock(productId, size) {
  if (manualStock[productId] && manualStock[productId][size] !== undefined) {
    return manualStock[productId][size];
  }
  const seed = `${productId}-${size}`;
  const rand = seededRandom(seed);
  // Map the pseudo-random number to a realistic stock range: 0 to 15
  return rand % 16;
}

export function getStockLabel(productId, size) {
  const stock = getStock(productId, size);
  if (stock === 0) return { label: "Out of Stock", stock, urgent: false, outOfStock: true };
  if (stock <= 3) return { label: `Only ${stock} left`, stock, urgent: true, outOfStock: false };
  return { label: "In Stock", stock, urgent: false, outOfStock: false };
}

export { sizes };