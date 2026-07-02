
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const liked = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative rounded-2xl overflow-hidden bg-sand h-[260px] md:h-[340px]">
          <span className="absolute top-3 left-3 bg-cream/95 backdrop-blur-sm text-charcoal text-[10px] font-display uppercase px-3 py-1.5 rounded-full z-10 tracking-wide">
            {product.category}
          </span>

          <span className="absolute top-3 right-3 bg-coral text-cream text-xs font-display font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
            ${product.price}
          </span>

          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <button
            onClick={handleWishlist}
            className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${
              liked
                ? "bg-coral text-cream scale-110"
                : "bg-cream/95 text-charcoal hover:bg-coral hover:text-cream"
            }`}
          >
            {liked ? "♥" : "♡"}
          </button>

          <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="bg-charcoal/80 backdrop-blur-sm text-cream text-[10px] font-body font-semibold uppercase px-3 py-1.5 rounded-full">
              Quick View
            </span>
          </div>
        </div>
      </Link>

      <div className="flex items-start justify-between mt-3 gap-2">
        <h3 className="font-display text-sm md:text-base uppercase leading-tight text-charcoal flex-1">
          {product.name}
        </h3>
      </div>

      <button
        onClick={handleAddToCart}
        className={`mt-3 w-full py-2.5 rounded-full font-body font-semibold text-sm uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
          added
            ? "bg-coral text-cream"
            : "bg-charcoal text-cream hover:bg-coral hover:gap-3"
        }`}
      >
        {added ? (
          <>Added <span>✓</span></>
        ) : (
          <>Add to Cart <span className="transition-transform duration-300 group-hover:translate-x-1">+</span></>
        )}
      </button>
    </div>
  );
}

export default ProductCard;