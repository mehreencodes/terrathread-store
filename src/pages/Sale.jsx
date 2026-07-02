import { useState, useEffect } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Sale() {
  const saleProducts = products.map((p) => ({
    ...p,
    originalPrice: p.price,
    price: Math.round(p.price * 0.8),
  }));

  // Countdown timer (resets to 24h on load, for demo urgency effect)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="bg-cream min-h-screen">

      {/* Bold sale hero with image background */}
<section className="relative px-6 md:px-12 pt-28 pb-12 overflow-hidden min-h-[420px] flex items-center">
  <img
    src="https://plus.unsplash.com/premium_photo-1683121261277-04160552d157?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Summer sale"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-charcoal/60"></div>

  <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left w-full">
    <p className="font-body text-sm uppercase tracking-widest mb-3 font-semibold text-coral">
      Flash Sale · Ends Soon
    </p>
    <h1 className="font-display font-black text-5xl md:text-7xl uppercase mb-6 leading-none text-cream">
      20% Off
      <br />Everything
    </h1>

    {/* Countdown */}
    <div className="flex items-center justify-center md:justify-start gap-3">
      {[
        { value: timeLeft.hours, label: "Hrs" },
        { value: timeLeft.minutes, label: "Min" },
        { value: timeLeft.seconds, label: "Sec" },
      ].map((unit) => (
        <div key={unit.label} className="bg-cream/95 backdrop-blur-sm rounded-2xl px-5 py-3 text-center min-w-[70px]">
          <p className="font-display font-black text-2xl md:text-3xl text-charcoal">{pad(unit.value)}</p>
          <p className="font-body text-[10px] uppercase tracking-wide text-charcoal/60">{unit.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Tiered savings strip */}
      <section className="bg-charcoal text-cream px-6 md:px-12 py-5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-2 font-body text-sm uppercase tracking-wide">
          <span>✦ All Items 20% Off</span>
          <span>✦ Free Shipping On $50+</span>
          <span>✦ Extra 5% Off With Code SUMMER</span>
        </div>
      </section>

      {/* Product grid */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-sm text-charcoal/50 mb-6">
            {saleProducts.length} items on sale
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <div key={product.id} className="relative">
                {/* Discount corner ribbon */}
                <div className="absolute -top-2 -left-2 z-20 bg-charcoal text-coral font-display text-xs uppercase px-3 py-1.5 rounded-full shadow-md">
                  -20%
                </div>

                <ProductCard product={product} />

                <div className="flex items-center gap-2 mt-2">
                  <p className="text-charcoal/40 text-sm font-body line-through">
                    ${product.originalPrice}
                  </p>
                  <p className="text-coral font-body font-bold text-sm">
                    You save ${product.originalPrice - product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sale;