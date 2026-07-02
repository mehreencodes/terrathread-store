function TestimonialCard({ name, role, rating, avatar, product, text }) {
  return (
    <div
      className="group relative bg-cream rounded-3xl p-8 pt-12 transition-all duration-500 hover:-translate-y-2"
      style={{
        boxShadow: "0 4px 20px rgba(45,42,38,0.06)",
      }}
    >
      {/* Big quote mark background */}
      <div
        className="absolute top-4 right-6 font-display font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110"
        style={{ fontSize: "80px", color: "#A8553D", opacity: 0.08 }}
      >
        "
      </div>

      {/* Floating avatar overlapping top */}
      <div className="absolute -top-8 left-8">
        <div
          className="w-16 h-16 rounded-2xl overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500"
          style={{ border: "3px solid #FBF8F3", boxShadow: "0 6px 16px rgba(45,42,38,0.15)" }}
        >
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Rating stars */}
      <div className="flex items-center gap-1 mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: "16px",
              color: i < rating ? "#C96F4A" : "#E8DCC8",
              lineHeight: 1,
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review text */}
      <p
        className="font-body text-sm leading-relaxed mb-6 relative z-10"
        style={{ color: "#6B6560" }}
      >
        {text}
      </p>

      {/* Divider */}
      <div className="h-px w-full mb-4" style={{ background: "#E8DCC8" }} />

      {/* Footer: name + product tag */}
      <div className="flex items-center justify-between relative z-10 gap-3">
        <div>
          <p className="font-display font-black text-sm uppercase text-charcoal leading-none mb-1">
            {name}
          </p>
          <p className="font-body text-[10px] uppercase tracking-widest" style={{ color: "#9A948D" }}>
            {role}
          </p>
        </div>
        <span
          className="font-body text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap"
          style={{ background: "rgba(168,85,61,0.1)", color: "#A8553D" }}
        >
          {product}
        </span>
      </div>
    </div>
  );
}

export default TestimonialCard;