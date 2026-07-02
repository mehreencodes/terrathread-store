import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-cream border-b-2 border-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: '#2D2A26' }}>
              <svg width="28" height="28" viewBox="0 0 28 28">
                <text x="14" y="21" textAnchor="middle" fontFamily="'Playfair Display', serif" fontWeight="700" fontSize="20" fill="#FBF8F3">T</text>
                <line x1="6" y1="24" x2="22" y2="24" stroke="#A8553D" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-display font-bold text-charcoal leading-none" style={{ fontSize: '19px', letterSpacing: '0.02em' }}>TerraThread</span>
              <span className="font-body uppercase leading-none" style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#A8553D' }}>Fashion · Style · You</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8 font-body font-semibold text-base tracking-wide text-charcoal uppercase">
            {/* <li><Link to="/" className="hover:text-coral transition-colors">Home</Link></li> */}
            <li>
  <Link
    to="/#home"
    onClick={(e) => {
      const el = document.getElementById("home");
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/#home");
      }
    }}
    className="hover:text-coral transition-colors"
  >
    Home
  </Link>
</li>
            <li><Link to="/shop" className="hover:text-coral transition-colors">Shop</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-coral transition-colors">New Arrivals</Link></li>
            <li><Link to="/sale" className="hover:text-coral transition-colors">Sale</Link></li>
            <li><Link to="/about" className="hover:text-coral transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-coral transition-colors">Contact</Link></li>
          </ul>

          {/* Desktop Right Icons */}
          <div className="hidden lg:flex items-center gap-5 text-charcoal relative">

            {/* Search */}
            <div className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-coral transition-colors cursor-pointer" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              {searchOpen && (
                <div className="absolute top-12 right-0 bg-cream border-2 border-charcoal rounded-2xl shadow-xl w-80 overflow-hidden z-50">
                  <form onSubmit={handleSearch} className="flex items-center gap-2 px-4 py-3 border-b border-charcoal/10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A948D" strokeWidth="2">
                      <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input type="text" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="flex-1 outline-none bg-transparent text-sm font-body text-charcoal" />
                    {searchQuery && <button type="button" onClick={() => setSearchQuery("")} className="text-charcoal/40 hover:text-charcoal text-lg leading-none cursor-pointer">×</button>}
                  </form>
                  {searchQuery.trim().length > 0 && (() => {
                    const results = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
                    return results.length > 0 ? (
                      <div className="max-h-72 overflow-y-auto">
                        {results.slice(0, 6).map((product) => (
                          <Link key={product.id} to={`/product/${product.id}`} onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="flex items-center gap-3 px-4 py-3 hover:bg-sand transition-colors border-b border-charcoal/5 last:border-0">
                            <img src={product.img} alt={product.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-body font-semibold text-sm text-charcoal truncate">{product.name}</p>
                              <p className="font-body text-xs text-charcoal/50 uppercase tracking-wide">{product.category}</p>
                            </div>
                            <span className="font-body font-bold text-sm flex-shrink-0" style={{ color: '#A8553D' }}>${product.price}</span>
                          </Link>
                        ))}
                        {results.length > 6 && <Link to="/shop" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="block text-center py-3 text-xs font-bold uppercase tracking-widest" style={{ color: '#A8553D' }}>View all {results.length} results →</Link>}
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className="font-body text-sm text-charcoal/40">No products found for</p>
                        <p className="font-body font-bold text-sm text-charcoal mt-1">"{searchQuery}"</p>
                      </div>
                    );
                  })()}
                  {searchQuery.trim().length === 0 && (
                    <div className="px-4 py-4">
                      <p className="font-body text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mb-3">Popular Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {["Dress", "Tops", "Skirt", "Outer", "Trendy"].map((cat) => (
                          <button key={cat} onClick={() => setSearchQuery(cat)} className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide cursor-pointer" style={{ background: '#F0EBE3', color: '#2D2A26' }}>{cat}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-coral transition-colors" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-coral text-cream text-[10px] rounded-full flex items-center justify-center font-body font-semibold">{cartCount}</span>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative hover:text-coral transition-colors" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlist.length > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-coral text-cream text-[10px] rounded-full flex items-center justify-center font-body font-semibold">{wishlist.length}</span>}
            </Link>

            {/* Desktop User / Login */}
            {user ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 bg-charcoal text-cream font-body font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-full cursor-pointer">
                  <span className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ background: '#C96F4A' }}>
                    {localStorage.getItem('userAvatar') ? <img src={localStorage.getItem('userAvatar')} alt="dp" className="w-full h-full object-cover" /> : <span className="text-xs font-display text-cream">{user.name.charAt(0).toUpperCase()}</span>}
                  </span>
                  Hi, {user.name.split(" ")[0]}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-cream border-2 border-charcoal rounded-2xl py-2 min-w-[200px] shadow-lg z-50">
                    <div className="px-4 py-2.5 border-b border-charcoal/10">
                      <p className="font-display uppercase text-sm text-charcoal truncate">{user.name}</p>
                      <p className="font-body text-xs text-charcoal/50 truncate">{user.email}</p>
                    </div>
                    <Link to="/orders" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 font-body text-sm text-charcoal hover:bg-sand transition-colors">My Orders</Link>
                    <Link to="/account" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 font-body text-sm text-charcoal hover:bg-sand transition-colors">Account Settings</Link>
                    {user.email === "admin@terrathread.com" && (
                      <Link to="/admin" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 font-body text-sm font-bold hover:bg-sand transition-colors" style={{ color: '#A8553D' }}>
                        <i className="ti ti-settings" style={{ fontSize: '14px' }} />
                        Admin Panel
                      </Link>
                    )}
                    <button onClick={() => { logout(); setDropdownOpen(false); }} className="w-full text-left px-4 py-2.5 font-body text-sm text-coral font-semibold hover:bg-sand transition-colors cursor-pointer border-t border-charcoal/10 mt-1">
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setLoginOpen(true)} className="flex items-center gap-2 bg-charcoal text-cream font-body font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-full hover:bg-coral transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                Login
              </button>
            )}
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)} className="flex items-center gap-2 bg-charcoal text-cream font-body font-bold text-xs uppercase tracking-wide px-3 py-2 rounded-full cursor-pointer">
                  <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ background: '#C96F4A' }}>
                    {localStorage.getItem('userAvatar') ? <img src={localStorage.getItem('userAvatar')} alt="dp" className="w-full h-full object-cover" /> : <span className="text-[10px] font-display text-cream">{user.name.charAt(0).toUpperCase()}</span>}
                  </span>
                  {user.name.split(" ")[0]}
                </button>
                {mobileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-cream border-2 border-charcoal rounded-2xl py-2 min-w-[180px] shadow-lg z-50">
                    <div className="px-4 py-2.5 border-b border-charcoal/10">
                      <p className="font-display uppercase text-xs text-charcoal truncate">{user.name}</p>
                      <p className="font-body text-[10px] text-charcoal/50 truncate">{user.email}</p>
                    </div>
                    <Link to="/orders" onClick={() => { setMobileDropdownOpen(false); setMenuOpen(false); }} className="block px-4 py-2.5 font-body text-sm text-charcoal hover:bg-sand transition-colors">My Orders</Link>
                    <Link to="/account" onClick={() => { setMobileDropdownOpen(false); setMenuOpen(false); }} className="block px-4 py-2.5 font-body text-sm text-charcoal hover:bg-sand transition-colors">Account Settings</Link>
                    {user.email === "admin@terrathread.com" && (
                      <Link to="/admin" onClick={() => { setMobileDropdownOpen(false); setMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2.5 font-body text-sm font-bold hover:bg-sand transition-colors" style={{ color: '#A8553D' }}>
                        <i className="ti ti-settings" style={{ fontSize: '14px' }} />
                        Admin Panel
                      </Link>
                    )}
                    <button onClick={() => { logout(); setMobileDropdownOpen(false); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 font-body text-sm text-coral font-semibold hover:bg-sand transition-colors cursor-pointer border-t border-charcoal/10 mt-1">
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setLoginOpen(true)} className="flex items-center gap-1.5 bg-charcoal text-cream font-body font-bold text-xs uppercase tracking-wide px-4 py-2 rounded-full hover:bg-coral transition-colors cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                Login
              </button>
            )}
            <button className="flex flex-col gap-1.5 z-50" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[30rem]" : "max-h-0"}`}>
          <ul className="flex flex-col gap-5 px-6 pb-6 pt-2 font-body font-semibold text-charcoal text-xl uppercase border-t-2 border-charcoal">
            {/* <li><Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-coral transition-colors">Home</Link></li> */}
<li>
  <Link
    to="/#home"
    onClick={(e) => {
      const el = document.getElementById("home");
      if (el) {
        e.preventDefault();
        setMenuOpen(false);
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", "/#home");
        }, 300);
      } else {
        setMenuOpen(false);
      }
    }}
    className="hover:text-coral transition-colors"
  >
    Home
  </Link>
</li>
            <li><Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-coral transition-colors">Shop</Link></li>
            <li><Link to="/new-arrivals" onClick={() => setMenuOpen(false)} className="hover:text-coral transition-colors">New Arrivals</Link></li>
            <li><Link to="/sale" onClick={() => setMenuOpen(false)} className="hover:text-coral transition-colors">Sale</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-coral transition-colors">About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-coral transition-colors">Contact</Link></li>
            <li className="pt-2 border-t border-charcoal/20">
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-coral transition-colors flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </li>
            <li>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="hover:text-coral transition-colors flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default Navbar;