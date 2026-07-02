import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6 text-center min-h-screen bg-cream flex flex-col items-center justify-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#F5F0E8' }}
        >
          <i className="ti ti-heart" style={{ fontSize: '32px', color: '#A8553D' }} />
        </div>
        <h1 className="font-display font-black text-3xl md:text-4xl uppercase text-charcoal mb-3">
          Your Wishlist Is Empty
        </h1>
        <p className="text-charcoal/60 mb-8 font-body max-w-sm">
          Tap the heart icon on any product to save it here for later.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
          style={{ background: '#A8553D', padding: '13px 24px' }}
        >
          Browse Shop
          <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#C96F4A' }}>
            <i className="ti ti-arrow-right" style={{ fontSize: '12px', color: '#FBF8F3' }} />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="font-body text-xs uppercase tracking-widest font-bold mb-1" style={{ color: '#C96F4A' }}>
              Saved For Later
            </p>
            <h1 className="font-display font-black text-3xl md:text-5xl uppercase text-charcoal">
              Your Wishlist
            </h1>
            <p className="font-body text-charcoal/50 text-sm mt-2">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <Link
            to="/shop"
            className="font-body font-bold text-xs uppercase tracking-widest text-charcoal border-b-2 border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors"
          >
            Continue Shopping →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;