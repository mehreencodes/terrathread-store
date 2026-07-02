import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useState } from "react";


function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [step, setStep] = useState(1); // 1: info, 2: payment, 3: success
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", zip: "", country: "Pakistan",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const shipping = cartTotal >= 50 || cartTotal === 0 ? 0 : 6.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;
  const suggestions = products.slice(0, 4);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const formatCard = (val) => val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  const formatExpiry = (val) => val.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  // const handlePay = (e) => {
  //   e.preventDefault();
  //   setStep(3);
  // };
const handlePay = (e) => {
  e.preventDefault();
  const newOrder = {
    id: `TT-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    status: "processing",
    items: cart.map(item => ({ name: item.name, price: item.price, img: item.img })),
    total: parseFloat(orderTotal.toFixed(2)),
    address: `${formData.address}, ${formData.city}`,
    customer: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
  };



  const existing = JSON.parse(localStorage.getItem('tt_orders') || '[]');
  localStorage.setItem('tt_orders', JSON.stringify([newOrder, ...existing]));
  setStep(3);
};

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="pt-32 pb-20 px-6 text-center min-h-screen bg-cream">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#F5F0E8' }}
        >
          <i className="ti ti-shopping-bag" style={{ fontSize: '32px', color: '#A8553D' }} />
        </div>
        <h1 className="font-display font-black text-3xl md:text-4xl uppercase text-charcoal mb-4">
          Your Cart Is Empty
        </h1>
        <p className="text-charcoal/60 mb-8 font-body">Looks like you haven't added anything yet.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          style={{ background: '#A8553D', padding: '13px 24px' }}
        >
          Start Shopping
          <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#C96F4A' }}>
            <i className="ti ti-arrow-right" style={{ fontSize: '12px', color: '#FBF8F3' }} />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-2">
          <p className="font-body text-xs uppercase tracking-widest font-bold mb-1" style={{ color: '#C96F4A' }}>My Cart</p>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase text-charcoal">Your Cart</h1>
        </div>
        <p className="font-body text-charcoal/50 text-sm mb-10">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>

        <div className="grid md:grid-cols-[1.6fr_1fr] gap-8">

          {/* Cart items */}
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl p-4" style={{ background: '#F5F0E8' }}>
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display uppercase text-charcoal text-sm md:text-base truncate">{item.name}</h3>
                  <p className="text-xs font-body uppercase tracking-wide mt-0.5" style={{ color: '#A8553D' }}>{item.category}</p>
                  {item.selectedSize && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ background: '#E8DCC8', color: '#2D2A26' }}>
                      Size: {item.selectedSize}
                    </span>
                  )}
                  <p className="text-charcoal/60 text-sm font-body mt-1">${item.price}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0" style={{ border: '1.5px solid #E8DCC8', borderRadius: '999px', padding: '2px' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-charcoal hover:bg-sand transition-colors cursor-pointer">−</button>
                  <span className="font-body font-bold w-5 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-charcoal hover:bg-sand transition-colors cursor-pointer">+</button>
                </div>
                <p className="font-display font-bold text-charcoal w-16 text-right flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-sand transition-colors flex-shrink-0 cursor-pointer" style={{ color: '#9A948D' }}>
                  <i className="ti ti-x" style={{ fontSize: '14px' }} />
                </button>
              </div>
            ))}

            {/* Free shipping progress */}
            {cartTotal < 50 && (
              <div className="rounded-2xl p-4" style={{ background: '#F5F0E8' }}>
                <div className="flex justify-between mb-2">
                  <p className="font-body text-xs font-bold uppercase tracking-wide text-charcoal">Free Shipping Progress</p>
                  <p className="font-body text-xs font-bold" style={{ color: '#A8553D' }}>${(50 - cartTotal).toFixed(2)} away</p>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: '#E8DCC8' }}>
                  <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min((cartTotal / 50) * 100, 100)}%`, background: '#A8553D' }} />
                </div>
              </div>
            )}
            {cartTotal >= 50 && (
              <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: 'rgba(168,85,61,0.08)', border: '1.5px solid #A8553D' }}>
                <i className="ti ti-truck" style={{ fontSize: '20px', color: '#A8553D' }} />
                <p className="font-body text-sm font-bold text-charcoal">You've unlocked <span style={{ color: '#A8553D' }}>Free Shipping!</span></p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="rounded-3xl p-7 h-fit sticky top-28" style={{ background: '#2D2A26' }}>
            <h2 className="font-display uppercase text-lg text-cream mb-6">Order Summary</h2>

            <div className="flex flex-col gap-3 font-body text-sm pb-5" style={{ borderBottom: '1px solid rgba(251,248,243,0.1)' }}>
              <div className="flex justify-between" style={{ color: 'rgba(251,248,243,0.6)' }}>
                <span>Subtotal ({cart.length} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between" style={{ color: 'rgba(251,248,243,0.6)' }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? '#C96F4A' : 'rgba(251,248,243,0.6)' }}>
                  {shipping === 0 ? "Free ✓" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between" style={{ color: 'rgba(251,248,243,0.6)' }}>
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-5">
              <span className="font-display uppercase text-sm text-cream">Total</span>
              <span className="font-display font-black text-2xl text-cream">${orderTotal.toFixed(2)}</span>
            </div>

            {/* Checkout button */}
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full inline-flex items-center justify-center gap-3 font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
              style={{ background: '#A8553D', padding: '14px' }}
            >
              Proceed to Checkout
              <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#C96F4A' }}>
                <i className="ti ti-lock" style={{ fontSize: '12px', color: '#FBF8F3' }} />
              </span>
            </button>

            {/* Trust */}
          <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
  {["ti-shield-check", "ti-lock", "ti-credit-card"].map((icon, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <i className={`ti ${icon}`} style={{ fontSize: '13px', color: 'rgba(251,248,243,0.3)' }} />
                  <span className="font-body text-[10px] uppercase tracking-wide" style={{ color: 'rgba(251,248,243,0.3)' }}>
                    {["Secure", "Encrypted", "Protected"][i]}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment icons */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {["VISA", "MC", "PAYPAL", "AMEX"].map((card) => (
                <div key={card} className="px-2 py-1 rounded text-[9px] font-bold" style={{ background: 'rgba(251,248,243,0.08)', color: 'rgba(251,248,243,0.4)' }}>
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upsell */}
        <div className="mt-16">
          <p className="font-body text-xs uppercase tracking-widest font-bold mb-1" style={{ color: '#C96F4A' }}>Curated For You</p>
          <h2 className="font-display font-black text-2xl uppercase text-charcoal mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {suggestions.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(45,42,38,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => { if (step !== 3) setShowCheckout(false); }}
        >
          <div
            className="bg-cream rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
            style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-cream px-8 pt-7 pb-4 border-b border-charcoal/8 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: '#C96F4A' }}>
                    {step === 3 ? 'Order Confirmed' : `Step ${step} of 2`}
                  </p>
                  <h3 className="font-display font-black text-xl uppercase text-charcoal">
                    {step === 1 ? 'Shipping Info' : step === 2 ? 'Payment' : 'Order Placed!'}
                  </h3>
                </div>
                {step !== 3 && (
                  <button
                    onClick={() => { setShowCheckout(false); setStep(1); }}
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-sand transition-colors cursor-pointer"
                  >
                    <i className="ti ti-x" style={{ fontSize: '16px', color: '#2D2A26' }} />
                  </button>
                )}
              </div>

              {/* Step indicator */}
              {step !== 3 && (
                <div className="flex gap-2 mt-4">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{ background: s <= step ? '#A8553D' : '#E8DCC8' }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="px-8 py-6">

              {/* STEP 1 — Shipping Info */}
              {step === 1 && (
                <form onSubmit={handleNext} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "firstName", label: "First Name", placeholder: "Sara" },
                      { name: "lastName", label: "Last Name", placeholder: "Ahmed" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">{field.label}</label>
                        <input
                          type="text"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-xl font-body text-sm text-charcoal outline-none transition-colors"
                          style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                          onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                          onBlur={(e) => e.target.style.borderColor = 'transparent'}
                        />
                      </div>
                    ))}
                  </div>

                  {[
                    { name: "email", label: "Email", type: "email", placeholder: "sara@email.com" },
                    { name: "phone", label: "Phone", type: "tel", placeholder: "+92 300 1234567" },
                    { name: "address", label: "Street Address", type: "text", placeholder: "123 Summer Ave" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-xl font-body text-sm text-charcoal outline-none transition-colors"
                        style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                        onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                      />
                    </div>
                  ))}

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "city", label: "City", placeholder: "Karachi" },
                      { name: "zip", label: "ZIP Code", placeholder: "75500" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">{field.label}</label>
                        <input
                          type="text"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-xl font-body text-sm text-charcoal outline-none transition-colors"
                          style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                          onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                          onBlur={(e) => e.target.style.borderColor = 'transparent'}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Order mini summary */}
                  <div className="rounded-2xl p-4 mt-2" style={{ background: '#F5F0E8' }}>
                    <div className="flex justify-between font-body text-sm text-charcoal/60 mb-1">
                      <span>Order Total</span>
                      <span className="font-bold text-charcoal">${orderTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-body text-xs text-charcoal/40">
                      <span>{cart.length} items · {shipping === 0 ? 'Free shipping' : `$${shipping} shipping`}</span>
                      <span>Tax: ${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer mt-2"
                    style={{ background: '#A8553D', padding: '14px' }}
                  >
                    Continue to Payment
                    <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#C96F4A' }}>
                      <i className="ti ti-arrow-right" style={{ fontSize: '12px', color: '#FBF8F3' }} />
                    </span>
                  </button>
                </form>
              )}

              {/* STEP 2 — Payment */}
              {step === 2 && (
                <form onSubmit={handlePay} className="flex flex-col gap-4">

                  {/* Delivery address recap */}
                  <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: '#F5F0E8' }}>
                    <i className="ti ti-map-pin mt-0.5" style={{ fontSize: '16px', color: '#A8553D' }} />
                    <div>
                      <p className="font-body font-bold text-xs text-charcoal uppercase tracking-wide mb-0.5">Delivering To</p>
                      <p className="font-body text-xs text-charcoal/60">{formData.firstName} {formData.lastName} · {formData.address}, {formData.city}</p>
                    </div>
                    <button type="button" onClick={() => setStep(1)} className="ml-auto font-body text-xs font-bold cursor-pointer" style={{ color: '#A8553D' }}>Edit</button>
                  </div>

                  {/* Payment method tabs */}
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-3">Payment Method</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {["Credit Card", "PayPal", "Cash on Delivery"].map((method, i) => (
                        <div
                          key={method}
                          className="rounded-xl p-3 text-center cursor-pointer transition-all duration-200"
                          style={{
                            background: i === 0 ? '#A8553D' : '#F5F0E8',
                            color: i === 0 ? '#FBF8F3' : '#2D2A26',
                            border: i === 0 ? 'none' : '1.5px solid #E8DCC8',
                          }}
                        >
                          <i className={`ti ${["ti-credit-card", "ti-brand-paypal", "ti-cash"][i]}`} style={{ fontSize: '18px', display: 'block', marginBottom: '4px' }} />
                          <span className="font-body font-bold text-[9px] uppercase tracking-wide">{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card fields */}
                  <div>
                    <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                      placeholder="Sara Ahmed"
                      className="w-full px-4 py-3 rounded-xl font-body text-sm text-charcoal outline-none"
                      style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                      onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                      onBlur={(e) => e.target.style.borderColor = 'transparent'}
                    />
                  </div>

                  <div>
                    <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: formatCard(e.target.value) })}
                        required
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 rounded-xl font-body text-sm text-charcoal outline-none pr-12"
                        style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                        onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                      />
                      <i className="ti ti-credit-card absolute right-4 top-1/2 -translate-y-1/2" style={{ fontSize: '18px', color: '#9A948D' }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: formatExpiry(e.target.value) })}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl font-body text-sm text-charcoal outline-none"
                        style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                        onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        placeholder="•••"
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-xl font-body text-sm text-charcoal outline-none"
                        style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                        onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                      />
                    </div>
                  </div>

                  {/* Total */}
                  <div className="rounded-2xl p-4" style={{ background: '#F5F0E8' }}>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-charcoal/60">Total to Pay</span>
                      <span className="font-black text-charcoal text-lg">${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Pay button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] cursor-pointer"
                    style={{ background: '#A8553D', padding: '14px' }}
                  >
                    <i className="ti ti-lock" style={{ fontSize: '14px' }} />
                    Pay ${orderTotal.toFixed(2)} Securely
                    <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#C96F4A' }}>
                      <i className="ti ti-arrow-right" style={{ fontSize: '12px', color: '#FBF8F3' }} />
                    </span>
                  </button>

                  <p className="font-body text-[10px] text-center text-charcoal/40 uppercase tracking-wide">
                    🔒 256-bit SSL encrypted · Your data is safe
                  </p>
                </form>
              )}

              {/* STEP 3 — Success */}
              {step === 3 && (
                <div className="text-center py-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: '#A8553D' }}
                  >
                    <i className="ti ti-check" style={{ fontSize: '36px', color: '#FBF8F3' }} />
                  </div>
                  <h3 className="font-display font-black text-2xl uppercase text-charcoal mb-2">Order Placed!</h3>
                  <p className="font-body text-sm text-charcoal/60 mb-1">
                    Thank you, <strong className="text-charcoal">{formData.firstName}</strong>!
                  </p>
                  <p className="font-body text-sm text-charcoal/60 mb-6">
                    Your order confirmation has been sent to <strong className="text-charcoal">{formData.email}</strong>
                  </p>

                  {/* Order details */}
                  <div className="rounded-2xl p-5 text-left mb-6" style={{ background: '#F5F0E8' }}>
                    <p className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-3">Order Summary</p>
                    <div className="flex justify-between font-body text-sm mb-1">
                      <span className="text-charcoal/60">{cart.length} Items</span>
                      <span className="font-bold text-charcoal">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm mb-1">
                      <span className="text-charcoal/60">Shipping</span>
                      <span className="font-bold" style={{ color: shipping === 0 ? '#A8553D' : '#2D2A26' }}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm border-t border-charcoal/10 pt-2 mt-2">
                      <span className="font-bold text-charcoal">Total Paid</span>
                      <span className="font-black text-charcoal">${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl p-4 flex items-center gap-3 mb-6" style={{ background: 'rgba(168,85,61,0.08)', border: '1.5px solid #A8553D' }}>
                    <i className="ti ti-truck" style={{ fontSize: '20px', color: '#A8553D' }} />
                    <p className="font-body text-xs text-charcoal/70 text-left">
                      Estimated delivery: <strong className="text-charcoal">3-5 business days</strong>
                    </p>
                  </div>

    <Link
                    to="/shop"
                    onClick={() => { setShowCheckout(false); setStep(1); }}
                    className="w-full inline-flex items-center justify-center gap-3 font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full transition-all duration-300 hover:opacity-90 cursor-pointer"
                    style={{ background: '#A8553D', padding: '14px' }}
                  >
                    Continue Shopping
                    <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#C96F4A' }}>
                      <i className="ti ti-arrow-right" style={{ fontSize: '12px', color: '#FBF8F3' }} />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart