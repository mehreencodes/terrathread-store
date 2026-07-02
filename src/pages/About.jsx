import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-cream min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-32 pb-24 overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-bl-full opacity-10 pointer-events-none" style={{ background: '#A8553D' }} />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-tr-full opacity-5 pointer-events-none" style={{ background: '#2D2A26' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-charcoal text-cream px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#C96F4A' }} />
            <p className="font-body text-xs uppercase tracking-widest font-semibold">Est. 2024 · Summer City</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                className="font-display font-black uppercase text-charcoal leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
              >
                Fashion That
                <br />
                <span style={{ color: '#A8553D' }}>Speaks</span>
                <br />
                For Itself.
              </h1>
              <p className="font-body text-charcoal/60 leading-relaxed mb-8 max-w-md" style={{ fontSize: '15px' }}>
                TerraThread was born from a simple belief — that style and sustainability are not opposites. We craft every piece with intention, care, and a deep respect for the people who wear them.
              </p>
              <div className="flex items-center gap-4">
        <button
  onClick={() => document.querySelector('#our-story')?.scrollIntoView({ behavior: 'smooth' })}
  className="inline-flex items-center gap-3 font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
  style={{ background: '#A8553D', padding: '12px 22px' }}
>
  Our Story
  <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#C96F4A' }}>
    <i className="ti ti-arrow-down" style={{ fontSize: '12px', color: '#FBF8F3' }} />
  </span>
</button>
              
              </div>
            </div>

            {/* Hero image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl h-[480px]">
                <img
                  src="https://images.unsplash.com/photo-1699206790849-446c43fa6b7d?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="TerraThread Story"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              </div>
              {/* Floating stat */}
              <div
                className="absolute -bottom-5 -left-5 bg-cream rounded-2xl px-5 py-4"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
              >
                <p className="font-display font-black text-3xl text-charcoal leading-none">3.2K+</p>
                <p className="font-body text-xs text-charcoal/50 uppercase tracking-wide mt-1">Happy Customers</p>
              </div>
              {/* Year pill */}
              <div
                className="absolute top-5 right-5 px-4 py-2 rounded-full text-cream text-xs font-bold uppercase tracking-widest"
                style={{ background: '#A8553D' }}
              >
                Since 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section className="px-6 md:px-12 py-6">
        <div
          className="max-w-5xl mx-auto rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden"
          style={{ background: '#2D2A26' }}
        >
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full opacity-10 pointer-events-none" style={{ background: '#C96F4A' }} />
          <div className="relative z-10 text-center">
            <span className="font-display text-7xl leading-none" style={{ color: '#A8553D' }}>"</span>
            <p className="font-display text-xl md:text-3xl leading-snug text-cream -mt-4 mb-8 max-w-2xl mx-auto">
              We got tired of choosing between looking good and doing good. So we built a brand where you don't have to.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2" style={{ ringColor: '#A8553D' }}>
                <img
                  src="https://plus.unsplash.com/premium_photo-1729688320964-b42095a429c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-display uppercase text-cream text-sm">Aisha Khan</p>
                <p className="font-body text-xs" style={{ color: 'rgba(251,248,243,0.4)' }}>Founder, TerraThread</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "3.2K+", label: "Customers", icon: "ti-heart" },
              { num: "12K+", label: "Trees Planted", icon: "ti-trees" },
              { num: "85%", label: "Recycled Materials", icon: "ti-refresh" },
              { num: "30+", label: "Fabric Partners", icon: "ti-building" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-3xl p-6 text-center flex flex-col items-center gap-3 hover:scale-[1.03] transition-all duration-300"
                style={{ background: i % 2 === 0 ? '#F5F0E8' : '#2D2A26' }}
              >
                <i
                  className={`ti ${stat.icon}`}
                  style={{ fontSize: '24px', color: i % 2 === 0 ? '#A8553D' : '#C96F4A' }}
                />
                <p
                  className="font-display font-black text-3xl md:text-4xl leading-none"
                  style={{ color: i % 2 === 0 ? '#2D2A26' : '#FBF8F3' }}
                >
                  {stat.num}
                </p>
                <p
                  className="font-body text-xs uppercase tracking-wide"
                  style={{ color: i % 2 === 0 ? '#9A948D' : 'rgba(251,248,243,0.5)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY — Timeline */}
      <section id="our-story" className="px-6 md:px-12 py-12" style={{ background: '#F5F0E8' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#C96F4A' }}>
              Our Journey
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase text-charcoal">
              How We Got Here
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { year: "2024", title: "The Idea", text: "Started in a small apartment, frustrated by fast fashion's waste, sketching designs that wouldn't cost the earth.", side: "left" },
              { year: "2024", title: "First Fabric Partner", text: "Found a family-run mill using organic cotton and recycled linen — our first 50 pieces sold out in days.", side: "right" },
              { year: "2025", title: "Going Carbon Neutral", text: "Partnered with reforestation projects, planting a tree for every order placed.", side: "left" },
              { year: "2026", title: "3,200+ Customers", text: "Now shipping worldwide, still hand-checking every fabric source ourselves.", side: "right" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-6 ${item.side === 'right' ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="bg-cream rounded-2xl p-6 shadow-sm">
                    <span
                      className="font-body text-xs font-bold uppercase tracking-widest mb-2 block"
                      style={{ color: '#C96F4A' }}
                    >
                      {item.year}
                    </span>
                    <h3 className="font-display font-black uppercase text-charcoal text-lg mb-2">{item.title}</h3>
                    <p className="font-body text-sm text-charcoal/60 leading-relaxed">{item.text}</p>
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-black text-cream text-xs"
                  style={{ background: '#A8553D' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <ValuesSection />

      {/* TEAM */}
      <section className="px-6 md:px-12 py-20 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#C96F4A' }}>
              The People
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase text-charcoal">
              Meet The Team
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Aisha Khan", role: "Founder & CEO", img: "https://plus.unsplash.com/premium_photo-1691784781482-9af9bce05096?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Sara Ahmed", role: "Head of Design", img: "https://plus.unsplash.com/premium_photo-1663051197459-16e9241040c7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Zara Malik", role: "Sustainability Lead", img: "https://plus.unsplash.com/premium_photo-1733306669049-2491bd1c0035?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Nida Hussain", role: "Customer Experience", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
            ].map((member, i) => (
              <div key={i} className="group text-center">
                <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-300" />
                </div>
                <p className="font-display font-bold text-sm uppercase text-charcoal">{member.name}</p>
                <p className="font-body text-xs mt-1" style={{ color: '#A8553D' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-6 md:px-12 py-8 bg-cream">
        <div
          className="max-w-5xl mx-auto rounded-3xl px-10 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background: '#A8553D' }}
        >
          <div>
            <h2 className="font-display font-black text-3xl md:text-4xl uppercase text-cream leading-tight mb-2">
              Ready To Find<br />Your Style?
            </h2>
            <p className="font-body text-sm" style={{ color: 'rgba(251,248,243,0.7)' }}>
              Explore our latest summer collection.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 font-body font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              style={{ background: '#FBF8F3', color: '#A8553D', padding: '14px 24px' }}
            >
              Shop Now
              <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#A8553D' }}>
                <i className="ti ti-arrow-right" style={{ fontSize: '12px', color: '#FBF8F3' }} />
              </span>
            </Link>
           <Link
  to="/new-arrivals"
  className="font-body font-bold text-xs uppercase tracking-widest pb-0.5 border-b-2 transition-colors"
  style={{ color: 'rgba(251,248,243,0.7)', borderColor: 'rgba(251,248,243,0.3)' }}
>
  New Arrivals →
</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function ValuesSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const values = [
    { num: "01", title: "Sustainable Materials", text: "Organic cotton, linen, and recycled fabrics in every collection — no exceptions.", bg: '#A8553D', txt: '#FBF8F3' },
    { num: "02", title: "Ethical Production", text: "Fair wages and safe working conditions, audited across our entire supply chain.", bg: '#E8DCC8', txt: '#2D2A26' },
    { num: "03", title: "Eco Packaging", text: "100% recyclable packaging, from the box to the tissue paper inside.", bg: '#2D2A26', txt: '#FBF8F3' },
    { num: "04", title: "Honest Pricing", text: "No fake discounts. The price you see reflects fair pay, not inflated markups.", bg: '#C96F4A', txt: '#FBF8F3' },
  ];

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / values.length;
    setActiveIndex(Math.min(Math.round(el.scrollLeft / cardWidth), values.length - 1));
  };

  const scrollToCard = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / values.length;
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section className="py-20" style={{ background: '#2D2A26' }}>
      <div className="px-6 md:px-12 max-w-6xl mx-auto mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="font-body text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#C96F4A' }}>
            Our Principles
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl uppercase text-cream">
            What We Won't Compromise On
          </h2>
        </div>
        <button
          onClick={() => scrollToCard(Math.min(activeIndex + 1, values.length - 1))}
          className="font-body text-xs uppercase tracking-widest hidden md:flex items-center gap-2 transition-colors cursor-pointer"
          style={{ color: 'rgba(251,248,243,0.4)' }}
        >
          Explore <i className="ti ti-arrow-right animate-pulse" style={{ fontSize: '14px' }} />
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-5 overflow-x-auto px-6 md:px-12 pb-4 scrollbar-hide snap-x snap-mandatory"
      >
        {values.map((v, i) => (
          <div
            key={v.num}
            className="rounded-3xl p-8 min-w-[260px] md:min-w-[300px] flex-shrink-0 snap-start"
            style={{ background: v.bg, color: v.txt }}
          >
            <p className="font-display text-5xl opacity-20 mb-4">{v.num}</p>
            <h3 className="font-display uppercase text-lg mb-3">{v.title}</h3>
            <p className="text-sm font-body leading-relaxed opacity-75">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {values.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === activeIndex ? '24px' : '6px',
              background: i === activeIndex ? '#C96F4A' : 'rgba(251,248,243,0.2)',
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default About;