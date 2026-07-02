import { useState } from "react";
import { Link } from "react-router-dom";
import homeImg from "../assets/home.png";
import CategoryGrid from "../components/CategoryGrid";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import TestimonialCard from "../components/TestimonialCard";
import Newsletter from "../components/Newsletter";
import TextReveal from "../components/TextReveal";
import AnimatedCounter from "../components/AnimatedCounter";

// ── Testimonials data ──
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Style Enthusiast",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    product: "Floral Summer Dress",
    text: "TerraThread's summer collection is amazing! Sustainable and stylish at the same time — exactly what I was looking for.",
  },
  {
    name: "Mark Davis",
    role: "Verified Buyer",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    product: "Cotton Shawl Blazer",
    text: "Fast shipping, great quality fabrics. This is my go-to store for everyday fashion now, no regrets at all.",
  },
  {
    name: "Emma Liu",
    role: "Repeat Customer",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    product: "Pleated Midi Skirt",
    text: "The fit and quality exceeded my expectations. Every piece feels premium and well-made, will order again.",
  },
  {
    name: "Ayesha Khan",
    role: "Fashion Blogger",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    product: "Linen Wrap Dress",
    text: "I get compliments every time I wear this. The fabric quality is unlike anything I've bought online before.",
  },
  {
    name: "James Carter",
    role: "Verified Buyer",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    product: "Denim Jacket",
    text: "Solid stitching, true to size, and the color hasn't faded after multiple washes. Impressed with the durability.",
  },
  {
    name: "Priya Sharma",
    role: "Style Enthusiast",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    product: "Silk Blend Blouse",
    text: "Customer service was so helpful with sizing questions. The blouse fits perfectly and feels luxurious.",
  },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  return (
    <div className="bg-cream text-charcoal overflow-x-hidden flex flex-col min-h-screen relative">
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── HERO ── */}
        <section id="home" className="relative bg-cream min-h-screen flex items-center py-8 pb-16">
          <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">

              {/* Left */}
              <div className="flex flex-col justify-center" style={{ animation: 'slideInLeft 0.7s cubic-bezier(.22,1,.36,1) 0.1s both' }}>
                <div className="inline-flex items-center gap-2 bg-charcoal text-cream px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest mb-3 self-start" style={{ animation: 'slideInLeft 0.5s ease 0.4s both' }}>
                  <i className="ti ti-sparkles" style={{ fontSize: '11px', color: '#C96F4A' }} />
                  Summer Sale — Up to 30% Off
                </div>
                <h2 className="text-charcoal mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(3rem, 5.5vw, 5rem)", lineHeight: "1.1", maxWidth: "580px" }}>
                  {[
                    { text: "Style", style: {} },
                    { text: "Is", style: {} },
                    { text: "A", style: {} },
                    { text: "Language,", style: { fontStyle: "italic" } },
                    { text: "Speak", style: {} },
                    { text: "It", style: {} },
                    { text: "Loud.", style: { color: "#C96F4A" } },
                  ].map((word, i) => (
                    <span
                      key={i}
                      className="inline-block overflow-hidden align-bottom"
                      style={{ paddingBottom: "0.2em", marginBottom: "-0.2em" }}
                    >
                      <span
                        className="inline-block transition-all ease-out"
                        style={{
                          ...word.style,
                          transitionDuration: "0.7s",
                          transitionDelay: `${0.4 + i * 0.06}s`,
                          transform: "translateY(0%)",
                          animation: `heroWordUp 0.7s cubic-bezier(.22,1,.36,1) ${0.4 + i * 0.06}s both`,
                        }}
                      >
                        {word.text}{"\u00A0"}
                      </span>
                    </span>
                  ))}
                </h2>
                <p className="text-sm mb-4 max-w-xs" style={{ color: "#6B6560", lineHeight: "1.55" }}>
                  Curated styles, quality you love,<br />delivered to your door.
                </p>
                <Link to="/shop" className="inline-flex items-center gap-3 text-cream font-bold uppercase rounded-full self-start mb-5 group transition-all duration-300 hover:opacity-90 hover:scale-[1.03] hover:shadow-lg" style={{ fontSize: "11px", letterSpacing: "0.1em", padding: "12px 20px", background: '#A8553D' }}>
                  Shop Now
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-cream text-xs transition-all duration-300 group-hover:translate-x-1" style={{ background: '#C96F4A' }}>→</span>
                </Link>
                <div className="flex items-start gap-5">
                  {[
                    { icon: "ti-truck", label: "Free Shipping", sub: "On orders over $50" },
                    { icon: "ti-shield-check", label: "Secure Payment", sub: "100% protected" },
                    { icon: "ti-refresh", label: "Easy Returns", sub: "30-day return" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 text-center">
                      <i className={`ti ${item.icon}`} style={{ fontSize: '18px', color: '#A8553D' }} />
                      <span className="text-[9px] font-bold text-charcoal uppercase tracking-wide">{item.label}</span>
                      <span className="text-[8px]" style={{ color: "#9A948D" }}>{item.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="relative group w-full" style={{ animation: 'slideInRight 0.7s cubic-bezier(.22,1,.36,1) 0.2s both' }}>
                <div className="absolute w-40 h-40 rounded-bl-full top-0 right-0 z-0 pointer-events-none" style={{ background: '#C96F4A', opacity: 0.15 }} />
                <div className="absolute w-24 h-24 rounded-bl-full top-0 right-0 z-0 pointer-events-none" style={{ background: '#A8553D', opacity: 0.2 }} />

                {/* Spinning circle */}
                <div className="absolute z-20 pointer-events-none" style={{ bottom: '150px', right: '-95px' }}>
                  <div className="relative w-28 h-28">
                    <svg className="absolute" style={{ top: '-20px', left: '-150px', width: '280px', height: '90px' }} viewBox="0 0 170 90">
                      <path d="M5 45 Q45 10 95 30" stroke="#A8553D" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                      <g transform="translate(95,30) rotate(22)">
                        <polygon points="-3,-5 7,0 -3,5" fill="#A8553D" />
                      </g>
                    </svg>
                    <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 120 120">
                      <defs>
                        <path id="circlePath" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
                      </defs>
                      <text fill="#A8553D" fontSize="10.5" fontFamily="Outfit" fontWeight="700" letterSpacing="3">
                        <textPath href="#circlePath">NEW ARRIVAL • SUMMER 2026 •</textPath>
                      </text>
                    </svg>
                    <div className="rounded-full overflow-hidden" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px' }}>
                      <img src={homeImg} alt="featured" className="w-full h-full object-cover" style={{ objectPosition: 'center 10%' }} />
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-20 text-cream text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: '#A8553D' }}>New Season</div>
                <div className="absolute bottom-14 left-0 right-0 h-px pointer-events-none z-0" style={{ background: '#E8DCC8' }} />
                <div className="absolute bottom-11 left-5 right-5 h-px pointer-events-none z-0" style={{ background: '#E8DCC8', opacity: 0.5 }} />

                <div className="relative overflow-hidden rounded-[2rem] h-[82vh] max-h-[560px]">
                  <img src={homeImg} alt="Fashion Model" className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]" style={{ objectPosition: 'center 8%' }} />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream via-cream/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <section className="bg-charcoal py-4 overflow-hidden flex-shrink-0">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 pr-6 font-display font-black text-coral text-lg md:text-2xl uppercase tracking-widest flex-shrink-0">
                <span>New Arrivals Every Week</span><span>✱</span>
                <span>Handpicked Styles</span><span>✱</span>
                <span>Premium Quality Fabrics</span><span>✱</span>
                <span>Exclusively For You</span><span>✱</span>
                <span>Express Delivery Available</span><span>✱</span>
                <span>Easy 30 Day Returns</span><span>✱</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── AS SEEN IN ── */}
        <section className="px-6 md:px-12 py-12 bg-cream">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-charcoal/10" />
              <p className="font-body text-xs uppercase tracking-widest text-charcoal/50 font-bold whitespace-nowrap">As Featured In</p>
              <div className="h-px flex-1 bg-charcoal/10" />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
              {[
                { name: "VOGUE", font: "'Playfair Display', serif", size: "20px", weight: 900, spacing: "0.2em" },
                { name: "ELLE", font: "'Outfit', sans-serif", size: "26px", weight: 900, spacing: "0.3em" },
                { name: "HARPER'S\nBAZAAR", font: "'Playfair Display', serif", size: "11px", weight: 700, spacing: "0.15em" },
                { name: "COSMOPOLITAN", font: "'Outfit', sans-serif", size: "11px", weight: 800, spacing: "0.1em" },
                { name: "IN STYLE", font: "'Playfair Display', serif", size: "16px", weight: 900, spacing: "0.2em" },
              ].map((brand) => (
                <div key={brand.name} className="flex items-center justify-center py-4 px-4 rounded-2xl border border-charcoal/8 hover:border-terracotta/30 hover:bg-sand/50 transition-all duration-300 cursor-default group">
                  <span className="text-charcoal/60 group-hover:text-charcoal/90 transition-colors duration-300 uppercase text-center leading-tight" style={{ fontFamily: brand.font, fontSize: brand.size, fontWeight: brand.weight, letterSpacing: brand.spacing }}>
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <CategoryGrid />

        {/* ── SUMMER PICKS ── */}
        <section className="py-16 md:py-20 overflow-hidden" style={{ background: '#F5F0E8' }}>
          <div className="max-w-6xl mx-auto px-6 md:px-12 mb-10">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <p className="font-body text-sm text-coral uppercase tracking-widest mb-2 font-semibold">Hot Right Now</p>
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase text-charcoal">
                  <TextReveal text="Summer Picks" />
                </h2>
              </div>
              <Link to="/shop" className="font-body font-semibold text-sm uppercase tracking-widest text-charcoal border-b-2 border-charcoal pb-1 hover:text-coral hover:border-coral transition-colors flex items-center gap-2">
                View All Products <span>→</span>
              </Link>
            </div>
          </div>

          {/* Auto scrolling strip */}
          <div className="flex gap-5 animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, repeat) => (
              <div key={repeat} className="flex gap-5 flex-shrink-0">
                {products.slice(0, 8).map((product, i) => (
                  <Link
                    key={i}
                    to={`/product/${product.id}`}
                    className="group flex-shrink-0 w-[220px] md:w-[260px] inline-block whitespace-normal"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-2xl mb-3" style={{ height: '300px' }}>
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-all duration-300" />

                      {/* Category pill */}
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
                        style={{ background: '#A8553D', color: '#FBF8F3' }}
                      >
                        {product.category}
                      </div>

                      {/* Wishlist on hover */}
                      <div
                        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                        style={{ background: '#FBF8F3' }}
                      >
                        <i className="ti ti-heart" style={{ fontSize: '15px', color: '#A8553D' }} />
                      </div>

                      {/* Add to cart on hover */}
                      <div
                        className="absolute bottom-4 left-4 right-4 py-2.5 rounded-xl font-body font-bold text-[10px] uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                        style={{ background: '#A8553D', color: '#FBF8F3' }}
                      >
                        Quick Add
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex items-start justify-between px-1">
                      <div>
                        <h3 className="font-display font-black text-sm uppercase text-charcoal leading-tight group-hover:text-terracotta transition-colors duration-200">
                          {product.name}
                        </h3>
                      </div>
                      <span className="font-body font-bold text-sm mt-0.5 flex-shrink-0" style={{ color: '#A8553D' }}>
                        ${product.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── SIZE GUIDE BANNER ── */}
        <section className="px-6 md:px-12 py-8 bg-cream">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: '#A8553D' }}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(251,248,243,0.15)' }}>
                  <i className="ti ti-ruler-measure" style={{ fontSize: '28px', color: '#FBF8F3' }} />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-cream leading-none mb-1">Find Your Perfect Fit</h3>
                  <p className="font-body text-sm" style={{ color: 'rgba(251,248,243,0.7)' }}>Not sure about your size? Our guide makes it easy.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap justify-center">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <span key={size} className="w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-xs cursor-pointer hover:scale-110 transition-all duration-200" style={{ background: 'rgba(251,248,243,0.15)', color: '#FBF8F3', border: '1.5px solid rgba(251,248,243,0.3)' }}>
                    {size}
                  </span>
                ))}
                <button onClick={() => document.getElementById('size-modal').showModal()} className="ml-2 inline-flex items-center gap-2 font-body font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02]" style={{ background: '#FBF8F3', color: '#A8553D', cursor: 'pointer' }}>
                  Size Guide
                  <i className="ti ti-arrow-right" style={{ fontSize: '14px' }} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SIZE GUIDE MODAL ── */}
        <dialog id="size-modal" className="rounded-3xl p-0 w-full max-w-2xl backdrop:bg-charcoal/50 backdrop:backdrop-blur-sm">
          <div className="bg-cream p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-black text-2xl uppercase text-charcoal">Size Guide</h3>
              <button onClick={() => document.getElementById('size-modal').close()} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-sand transition-colors">
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
                    <tr key={size} className={i % 2 === 0 ? 'bg-sand/40' : 'bg-cream'}>
                      <td className="py-3 px-4 font-black text-charcoal">{size}</td>
                      <td className="py-3 px-4 text-charcoal/70">{chest}</td>
                      <td className="py-3 px-4 text-charcoal/70">{waist}</td>
                      <td className="py-3 px-4 text-charcoal/70">{hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-body text-xs text-charcoal/50 mt-5 text-center">Measurements are in inches. When in between sizes, we recommend sizing up.</p>
          </div>
        </dialog>

        {/* ── COLLECTION BANNER ── */}
        <section className="px-6 md:px-12 py-16 md:py-20" style={{ background: '#2D2A26' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:items-stretch">
              <div className="rounded-3xl overflow-hidden relative group min-h-[380px] md:min-h-0 h-full">
                <img src="https://images.unsplash.com/photo-1773439878437-11da66df98e9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0" alt="Summer Collection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"></div>
                <div className="absolute top-6 left-6 w-16 h-16 bg-coral rounded-full flex items-center justify-center text-cream font-display text-2xl animate-spin-slow z-10">✦</div>
                <div className="absolute top-6 right-6 bg-cream/95 backdrop-blur-sm px-4 py-2.5 rounded-full z-10">
                  <p className="font-display text-xs uppercase tracking-wide text-charcoal">
                    <AnimatedCounter end={42} suffix="+ New Pieces" duration={1000} />
                  </p>
                </div>
                <div className="absolute bottom-6 left-6 bg-cream/95 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 z-10">
                  <div className="flex text-coral text-sm">★★★★★</div>
                  <div className="border-l border-charcoal/20 pl-3">
                    <p className="font-display text-sm text-charcoal leading-none">4.9/5</p>
                    <p className="font-body text-[10px] text-charcoal/50 uppercase">
                      <AnimatedCounter end={2100} suffix="+ Reviews" duration={1200} />
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-skyblue rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden h-full">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-cream/20 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-coral rounded-full animate-pulse"></span>
                    <p className="font-body text-sm uppercase tracking-widest font-semibold text-charcoal">Limited Time Offer</p>
                  </div>
                  <h2 className="font-display font-black text-4xl md:text-6xl uppercase leading-none text-charcoal mb-6">
                    <TextReveal text="Summer" /><br /><TextReveal text="Collection" delay={0.3} />
                  </h2>
                  <p className="text-charcoal/70 max-w-md font-body leading-relaxed">Whether you're looking for bold prints or classic neutrals, we have something for everyone this season.</p>
                </div>
                <div className="relative z-10 grid grid-cols-3 gap-4 mt-8 mb-8 py-6 border-y border-charcoal/15">
                  {[["30%", "Off Today"], ["Free", "Shipping $50+"], ["30 Day", "Easy Returns"]].map(([num, label]) => (
                    <div key={label}>
                      <p className="font-display font-black text-2xl md:text-3xl text-charcoal">{num}</p>
                      <p className="font-body text-[11px] uppercase text-charcoal/60 tracking-wide mt-1">{label}</p>
                    </div>
                  ))}
                </div>
                <Link to="/shop" className="relative z-10 inline-flex items-center justify-center gap-2 bg-charcoal text-cream font-body font-semibold uppercase px-8 py-4 rounded-full hover:bg-coral transition-all duration-300 self-start group">
                  Explore Now <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── STYLE BY OCCASION ── */}
        <section className="px-6 md:px-12 py-16 md:py-20 bg-cream">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="font-body text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#C96F4A' }}>
                  Dress For Every Moment
                </p>
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase text-charcoal">
                  <TextReveal text="Style By Occasion" />
                </h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-body font-bold text-xs uppercase tracking-widest pb-1 border-b-2 transition-colors hover:opacity-70"
                style={{ color: '#C96F4A', borderColor: '#C96F4A' }}
              >
                Explore All →
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Big card — left */}
              <Link
                to="/shop"
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{ minHeight: '420px' }}
              >
                <img
                  src=
                  "https://i.pinimg.com/1200x/eb/fd/d8/ebfdd88d23dd0b9d777845c05ff65170.jpg"
                  alt="Casual Day"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(45,42,38,0.85) 0%, rgba(45,42,38,0.1) 60%, transparent 100%)' }} />

                {/* Top badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(251,248,243,0.12)', backdropFilter: 'blur(8px)' }}>
                    <i className="ti ti-sun" style={{ fontSize: '18px', color: '#FBF8F3' }} />
                  </div>
                  <span className="font-body font-bold text-[10px] uppercase tracking-widest text-cream/70">12 Styles</span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-black text-3xl uppercase text-cream leading-none mb-1">
                    Casual Day
                  </h3>
                  <p className="font-body text-sm mb-4" style={{ color: 'rgba(251,248,243,0.6)' }}>
                    Relaxed, comfy & effortlessly chic
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body font-bold text-xs uppercase tracking-widest transition-all duration-300 group-hover:gap-3"
                    style={{ background: '#A8553D', color: '#FBF8F3' }}
                  >
                    Shop Now
                    <i className="ti ti-arrow-right" style={{ fontSize: '13px' }} />
                  </div>
                </div>
              </Link>

              {/* Right — 3 small cards stacked */}
              <div className="flex flex-col gap-4">

                {/* Work Wear */}
                <Link
                  to="/shop"
                  className="group relative rounded-3xl overflow-hidden cursor-pointer flex items-center gap-5 p-6 transition-all duration-300 hover:scale-[1.01]"
                  style={{ background: '#A8553D', minHeight: '130px' }}
                >
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10" style={{ background: '#FBF8F3' }} />
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(251,248,243,0.15)' }}>
                    <i className="ti ti-briefcase" style={{ fontSize: '22px', color: '#FBF8F3' }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: 'rgba(251,248,243,0.5)' }}>8 Styles</p>
                    <h3 className="font-display font-black text-xl uppercase text-cream leading-none">Work Wear</h3>
                    <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(251,248,243,0.6)' }}>Sharp & polished looks</p>
                  </div>
                  <i className="ti ti-arrow-right flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: '20px', color: 'rgba(251,248,243,0.4)' }} />
                </Link>

                {/* Evening Out */}
                <Link
                  to="/shop"
                  className="group relative rounded-3xl overflow-hidden cursor-pointer flex items-center gap-5 p-6 transition-all duration-300 hover:scale-[1.01]"
                  style={{ background: '#F5F0E8', minHeight: '120px' }}
                >
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10" style={{ background: '#A8553D' }} />
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(168,85,61,0.1)' }}>
                    <i className="ti ti-sparkles" style={{ fontSize: '22px', color: '#A8553D' }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: '#9A948D' }}>10 Styles</p>
                    <h3 className="font-display font-black text-xl uppercase text-charcoal leading-none">Evening Out</h3>
                    <p className="font-body text-xs mt-0.5" style={{ color: '#9A948D' }}>Glam & elegant pieces</p>
                  </div>
                  <i className="ti ti-arrow-right flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: '20px', color: '#C96F4A' }} />
                </Link>

                {/* Weekend Vibes */}
                <Link
                  to="/shop"
                  className="group relative rounded-3xl overflow-hidden cursor-pointer flex items-center gap-5 p-6 transition-all duration-300 hover:scale-[1.01]"
                  style={{ background: '#F5F0E8', border: '1px solid #E8DCC8', minHeight: '120px' }}
                >
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-5" style={{ background: '#FBF8F3' }} />
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(251,248,243,0.08)' }}>
                    <i className="ti ti-music" style={{ fontSize: '22px', color: '#C96F4A' }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-[10px] uppercase tracking-widest font-bold mb-0.5" ></p>
                    <h3 className="font-display font-black text-xl uppercase text-charcoal leading-none"> Weekend Vibes</h3>
                    <p className="font-body text-xs mt-0.5" style={{ color: '#9A948D' }}>Fun & effortless fits</p>
                  </div>
                  <i className="ti ti-arrow-right flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: '20px', color: '#C96F4A' }} />
                </Link>

              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="px-6 md:px-12 py-16 md:py-20 bg-sand overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-body text-sm text-coral uppercase tracking-widest mb-2 font-semibold">Real Reviews, Real Style</p>
              <h2 className="font-display font-black text-3xl md:text-5xl uppercase text-charcoal">
                Loved By <AnimatedCounter end={3200} suffix="+" /> Customers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials
                .slice(currentSlide * cardsPerSlide, currentSlide * cardsPerSlide + cardsPerSlide)
                .map((t, i) => (
                  <div
                    key={t.name}
                    style={{
                      animation: `fadeInUp 0.5s ease ${i * 0.1}s both`,
                    }}
                  >
                    <TestimonialCard {...t} />
                  </div>
                ))}
            </div>

            {/* Navigation: arrows + dots */}
            <div className="flex items-center justify-center gap-6 mt-10">
              {/* Prev arrow */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: "#F5F0E8", color: "#A8553D" }}
                aria-label="Previous testimonials"
              >
                <i className="ti ti-chevron-left" style={{ fontSize: "18px" }} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: currentSlide === i ? "24px" : "8px",
                      height: "8px",
                      background: currentSlide === i ? "#A8553D" : "#E8DCC8",
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next arrow */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: "#F5F0E8", color: "#A8553D" }}
                aria-label="Next testimonials"
              >
                <i className="ti ti-chevron-right" style={{ fontSize: "18px" }} />
              </button>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <Newsletter />

      </div>
    </div>
  );
}

export default Home;