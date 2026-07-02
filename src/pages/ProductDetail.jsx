import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  const isWishlisted = wishlist.some((w) => w.id === product?.id);
  const related = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-4">
        <p className="font-display text-3xl uppercase text-charcoal">Product Not Found</p>
        <Link to="/shop" className="font-body text-sm uppercase tracking-widest font-bold px-6 py-3 rounded-full text-cream" style={{ background: '#A8553D' }}>
          Back To Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addToCart({ ...product, selectedSize, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <div className="bg-cream min-h-screen">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <div className="flex items-center gap-2 text-[11px] font-body uppercase tracking-widest text-charcoal/40">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-terracotta transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-charcoal/70">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left — Image */}
         {/* Left — Image */}
<div className="relative">
  <div className="relative overflow-hidden rounded-3xl aspect-[3/4] bg-sand">
    <img
      key={activeImage}
      src={[product.img, product.img, product.img][activeImage]}
      alt={product.name}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
    />
              {/* Category pill */}
              <div
                className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{ background: '#A8553D', color: '#FBF8F3' }}
              >
                {product.category}
              </div>
              {/* Wishlist button */}
              <button
                onClick={handleWishlist}
                className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
                style={{ background: isWishlisted ? '#A8553D' : 'rgba(251,248,243,0.9)' }}
              >
                <i className="ti ti-heart" style={{ fontSize: '18px', color: isWishlisted ? '#FBF8F3' : '#A8553D' }} />
              </button>
            </div>

            {/* Thumbnail strip — same image for now */}
           {/* Thumbnail strip */}
<div className="flex gap-3 mt-4">
  {[product.img, product.img, product.img].map((img, i) => (
    <button
      key={i}
      onClick={() => setActiveImage(i)}
      className="w-20 h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200"
      style={{ borderColor: activeImage === i ? '#A8553D' : 'transparent' }}
    >
      <img src={img} alt="" className="w-full h-full object-cover" />
    </button>
  ))}
</div>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col gap-5 pt-2">

            {/* Name + price */}
            <div>
              <p className="font-body text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#C96F4A' }}>
                {product.category}
              </p>
              <h1
                className="font-display font-black uppercase text-charcoal mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
              >
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="font-body font-black text-2xl" style={{ color: '#A8553D' }}>
                  ${product.price}.00
                </span>
                <span className="font-body text-sm line-through text-charcoal/30">
                  ${Math.round(product.price * 1.3)}.00
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                  style={{ background: '#E8DCC8', color: '#A8553D' }}
                >
                  Save 23%
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} style={{ color: '#C96F4A', fontSize: '14px' }}>★</span>
                ))}
              </div>
              <span className="font-body text-xs text-charcoal/50">(4.8) · 124 reviews</span>
            </div>

            <div className="h-px bg-charcoal/8" />

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-body font-bold text-sm uppercase tracking-wide text-charcoal">
                  Select Size
                </p>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="font-body text-xs uppercase tracking-wide font-bold cursor-pointer flex items-center gap-1"
                  style={{ color: '#A8553D' }}
                >
                  <i className="ti ti-ruler-measure" style={{ fontSize: '13px' }} />
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className="w-11 h-11 rounded-full font-body font-bold text-xs transition-all duration-200 hover:scale-105 cursor-pointer"
                    style={{
                      background: selectedSize === size ? '#A8553D' : '#F0EBE3',
                      color: selectedSize === size ? '#FBF8F3' : '#2D2A26',
                      border: sizeError ? '1.5px solid #E8614A' : 'none',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="font-body text-xs mt-2" style={{ color: '#E8614A' }}>
                  Please select a size to continue
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <p className="font-body font-bold text-sm uppercase tracking-wide text-charcoal mb-3">Quantity</p>
              <div className="flex items-center gap-0 rounded-full overflow-hidden w-fit" style={{ border: '1.5px solid #E8DCC8' }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center font-bold text-lg text-charcoal hover:bg-sand transition-colors cursor-pointer"
                >
                  −
                </button>
                <span className="w-10 text-center font-body font-bold text-sm text-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center font-bold text-lg text-charcoal hover:bg-sand transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
         <div className="flex flex-col sm:flex-row gap-3">
  <button
    onClick={handleAddToCart}
                className="flex-1 py-4 rounded-full font-body font-bold text-sm uppercase tracking-widest text-cream transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
                style={{ background: added ? '#2D2A26' : '#A8553D' }}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <Link
                to="/cart"
                className="flex-1 py-4 rounded-full font-body font-bold text-sm uppercase tracking-widest text-charcoal text-center transition-all duration-300 hover:bg-charcoal hover:text-cream cursor-pointer"
                style={{ border: '1.5px solid #2D2A26' }}
              >
                Buy Now
              </Link>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y" style={{ borderColor: '#E8DCC8' }}>
              {[
                { icon: "ti-truck", label: "Free Shipping", sub: "Over $50" },
                { icon: "ti-refresh", label: "30 Day Returns", sub: "Easy returns" },
                { icon: "ti-shield-check", label: "Secure Pay", sub: "100% safe" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1 text-center">
                  <i className={`ti ${item.icon}`} style={{ fontSize: '20px', color: '#A8553D' }} />
                  <span className="font-body font-bold text-[10px] uppercase tracking-wide text-charcoal">{item.label}</span>
                  <span className="font-body text-[9px] text-charcoal/40">{item.sub}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div>
             <div className="flex gap-0 border-b overflow-x-auto" style={{ borderColor: '#E8DCC8' }}>
  {["description", "details", "reviews"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className="px-4 md:px-5 py-3 font-body font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer flex-shrink-0"
                    style={{
                      color: activeTab === tab ? '#A8553D' : '#9A948D',
                      borderBottom: activeTab === tab ? '2px solid #A8553D' : '2px solid transparent',
                      marginBottom: '-1px',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                {activeTab === "description" && (
                  <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                    Elevate your wardrobe with the {product.name}. Crafted from premium quality fabrics, this piece combines comfort with effortless style. Perfect for any occasion — from casual outings to elegant evenings. Each piece is thoughtfully designed to flatter all body types and bring confidence to your everyday look.
                  </p>
                )}
                {activeTab === "details" && (
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Material", value: "100% Premium Cotton" },
                      { label: "Fit", value: "Regular Fit" },
                      { label: "Care", value: "Machine wash cold, gentle cycle" },
                      { label: "Origin", value: "Ethically made" },
                      { label: "Category", value: product.category },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-4 py-2 border-b" style={{ borderColor: '#F0EBE3' }}>
                        <span className="font-body font-bold text-xs uppercase tracking-wide text-charcoal/50 w-24 flex-shrink-0">{item.label}</span>
                        <span className="font-body text-sm text-charcoal">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="flex flex-col gap-4">
                    {[
                      { name: "Sarah J.", rating: 5, text: "Absolutely love this piece! The quality is amazing and fits perfectly.", date: "2 days ago" },
                      { name: "Emma L.", rating: 4, text: "Great product, fast delivery. Will definitely order again!", date: "1 week ago" },
                      { name: "Mia K.", rating: 5, text: "Exactly as shown in the picture. Very happy with my purchase.", date: "2 weeks ago" },
                    ].map((review, i) => (
                      <div key={i} className="p-4 rounded-2xl" style={{ background: '#F5F0E8' }}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-body font-bold text-sm text-charcoal">{review.name}</span>
                            <div className="flex gap-0.5 mt-0.5">
                              {[...Array(review.rating)].map((_, s) => (
                                <span key={s} style={{ color: '#C96F4A', fontSize: '11px' }}>★</span>
                              ))}
                            </div>
                          </div>
                          <span className="font-body text-[10px] text-charcoal/40">{review.date}</span>
                        </div>
                        <p className="font-body text-xs text-charcoal/70 leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-body text-xs uppercase tracking-widest font-bold mb-1" style={{ color: '#C96F4A' }}>
                You May Also Like
              </p>
              <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-charcoal">
                Related Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="font-body font-bold text-xs uppercase tracking-widest text-charcoal border-b-2 border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Modal */}
      {sizeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(45,42,38,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSizeModalOpen(false)}
        >
          <div
            className="bg-cream rounded-3xl p-8 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-black text-xl uppercase text-charcoal">Size Guide</h3>
              <button
                onClick={() => setSizeModalOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-sand transition-colors cursor-pointer"
              >
                <i className="ti ti-x" style={{ fontSize: '18px', color: '#2D2A26' }} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr style={{ background: '#A8553D' }}>
                    {["Size", "Chest (in)", "Waist (in)", "Hips (in)"].map((h) => (
                      <th key={h} className="py-3 px-4 text-cream font-bold uppercase tracking-wide text-left text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["XS", "32–33", "24–25", "34–35"],
                    ["S",  "34–35", "26–27", "36–37"],
                    ["M",  "36–37", "28–29", "38–39"],
                    ["L",  "38–40", "30–32", "40–42"],
                    ["XL", "41–43", "33–35", "43–45"],
                    ["XXL","44–46", "36–38", "46–48"],
                  ].map(([size, chest, waist, hips], i) => (
                    <tr key={size} style={{ background: i % 2 === 0 ? '#F5F0E8' : '#FBF8F3' }}>
                      <td className="py-3 px-4 font-black text-charcoal">{size}</td>
                      <td className="py-3 px-4 text-charcoal/70">{chest}</td>
                      <td className="py-3 px-4 text-charcoal/70">{waist}</td>
                      <td className="py-3 px-4 text-charcoal/70">{hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-body text-xs text-charcoal/40 mt-4 text-center">
              When between sizes, we recommend sizing up.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetail;