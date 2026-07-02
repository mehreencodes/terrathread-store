import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function NewArrivals() {
  const newProducts = products.slice(-6).reverse();
  const [spotlight, setSpotlight] = useState(newProducts[0]);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [notified, setNotified] = useState(false);

  const handleAddToCart = () => {
    addToCart(spotlight);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleNotify = () => {
    setNotified(true);
    setTimeout(() => setNotified(false), 3000);
  };

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Editorial header */}
        <div className="mb-12 max-w-xl">
          <p className="font-body text-sm text-coral uppercase tracking-widest mb-3 font-semibold">
            Editor's Selection
          </p>
          <h1 className="font-display font-black text-4xl md:text-6xl uppercase text-charcoal leading-tight">
            This Week's
            <br />Arrivals
          </h1>
          <p className="text-charcoal/60 font-body mt-4">
            A curated look at what's new. Click any piece to spotlight it.
          </p>
        </div>

        {/* Magazine-style: large spotlight + side list */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14">

          {/* Spotlight panel */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden h-[420px] md:h-[560px] relative bg-sand">
              <img
                src={spotlight.img}
                alt={spotlight.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between gap-4">
                <div>
                  <span className="font-body text-xs uppercase tracking-widest text-cream/70">
                    {spotlight.category}
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-4xl uppercase text-cream leading-tight mt-1">
                    {spotlight.name}
                  </h2>
                  <p className="font-display text-coral text-xl mt-2">${spotlight.price}</p>
                </div>

                <button
  onClick={handleAddToCart}
  className="flex-shrink-0 px-6 py-3.5 rounded-full font-body font-semibold uppercase text-sm transition-all duration-300 cursor-pointer hover:scale-[1.03]"
  style={{ background: added ? '#A8553D' : '#FBF8F3', color: added ? '#FBF8F3' : '#2D2A26' }}
>
  {added ? "Added ✓" : "Add to Cart"}
</button>
              </div>
            </div>
          </div>

          {/* Side list */}
          <div className="flex flex-col gap-3">
            {newProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => setSpotlight(product)}
               className="flex items-center gap-4 p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer"
style={{ background: spotlight.id === product.id ? '#A8553D' : 'transparent' }}
onMouseEnter={(e) => { if (spotlight.id !== product.id) e.currentTarget.style.background = '#F5F0E8'; }}
onMouseLeave={(e) => { if (spotlight.id !== product.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-display uppercase text-sm leading-tight truncate ${
                    spotlight.id === product.id ? "text-cream" : "text-charcoal"
                  }`}>
                    {product.name}
                  </h3>
                  <p className={`font-body text-xs mt-0.5 ${
                    spotlight.id === product.id ? "text-cream/60" : "text-charcoal/50"
                  }`}>
                    {product.category} · ${product.price}
                  </p>
                </div>
                <span className={spotlight.id === product.id ? "text-coral" : "text-charcoal/30"}>
                  →
                </span>
              </button>
            ))}

            <Link
              to="/shop"
              className="text-center font-body font-semibold text-sm uppercase tracking-widest text-charcoal border-2 border-charcoal rounded-full py-3 mt-2 hover:bg-charcoal hover:text-cream transition-colors"
            >
              View Full Shop
            </Link>
          </div>
        </div>

        {/* Notify strip */}
        <div className="mt-16 bg-skyblue rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-display font-black text-2xl uppercase text-charcoal">
              Never Miss A Drop
            </h3>
            <p className="text-charcoal/70 font-body mt-1 text-sm">
              New arrivals land every Friday. Get notified the moment they're live.
            </p>
          </div>
        <button
  onClick={handleNotify}
  className="flex-shrink-0 px-8 py-4 rounded-full font-body font-semibold uppercase transition-all duration-300 cursor-pointer hover:scale-[1.02]"
  style={{ background: notified ? '#A8553D' : '#2D2A26', color: '#FBF8F3' }}
>
  {notified ? "You're Notified" : "Notify Me"}
</button>
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;