import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address"); return; }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-charcoal text-cream px-6 md:px-12 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: '#FBF8F3' }}>
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <text x="14" y="21" textAnchor="middle" fontFamily="'Playfair Display', serif" fontWeight="700" fontSize="20" fill="#2D2A26">T</text>
                  <line x1="6" y1="24" x2="22" y2="24" stroke="#A8553D" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-bold text-cream leading-none" style={{ fontSize: '19px', letterSpacing: '0.02em' }}>
                  TerraThread
                </span>
                <span className="font-body uppercase leading-none" style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#A8553D' }}>
                  Fashion · Style · You
                </span>
              </div>
            </Link>
            <p className="text-cream/50 text-sm font-body leading-relaxed">
              Sustainable, stylish fashion for the modern wardrobe. Summer collection now live.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-display uppercase text-sm mb-4 tracking-widest text-cream/80">Shop</h4>
            <ul className="flex flex-col gap-2.5 font-body text-sm text-cream/60">
              <li><Link to="/shop" className="hover:text-coral transition-colors">All Products</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-coral transition-colors">New Arrivals</Link></li>
              <li><Link to="/sale" className="hover:text-coral transition-colors">Sale</Link></li>
              <li><Link to="/cart" className="hover:text-coral transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-display uppercase text-sm mb-4 tracking-widest text-cream/80">Company</h4>
            <ul className="flex flex-col gap-2.5 font-body text-sm text-cream/60">
              <li><Link to="/about" className="hover:text-coral transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-coral transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-coral transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-coral transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display uppercase text-sm mb-4 tracking-widest text-cream/80">Stay Updated</h4>
            <p className="text-cream/50 text-sm font-body mb-4">
              Get summer drops and offers straight to your inbox.
            </p>

            {submitted ? (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: 'rgba(168,85,61,0.15)', border: '1px solid #A8553D' }}
              >
                <i className="ti ti-circle-check" style={{ fontSize: '20px', color: '#A8553D' }} />
                <div>
                  <p className="font-body font-bold text-sm text-cream">You're subscribed!</p>
                  <p className="font-body text-xs" style={{ color: 'rgba(251,248,243,0.5)' }}>Welcome to TerraThread family.</p>
                </div>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 rounded-full bg-cream/10 border border-cream/20 outline-none placeholder:text-cream/40 focus:border-coral transition-colors font-body text-sm text-cream"
                  />
                  <button
                    type="submit"
                    className="bg-coral text-cream px-5 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-terracotta transition-colors cursor-pointer flex-shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
                {error && (
                  <p className="font-body text-xs mt-2" style={{ color: '#E8614A' }}>
                    <i className="ti ti-alert-circle" style={{ fontSize: '12px' }} /> {error}
                  </p>
                )}
              </>
            )}

            {/* Social icons */}
            <div className="flex gap-4 mt-5">
              <a href="#" aria-label="Instagram" className="text-cream/60 hover:text-coral transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-cream/60 hover:text-coral transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-cream/60 hover:text-coral transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-sm font-body">
            &copy; 2026 TerraThread. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-cream/40">
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="3" fill="currentColor" opacity="0.2"/><text x="16" y="13" textAnchor="middle" fontSize="7" fill="currentColor">VISA</text></svg>
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="3" fill="currentColor" opacity="0.2"/><text x="16" y="13" textAnchor="middle" fontSize="6" fill="currentColor">MASTER</text></svg>
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="3" fill="currentColor" opacity="0.2"/><text x="16" y="13" textAnchor="middle" fontSize="6" fill="currentColor">PAYPAL</text></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;