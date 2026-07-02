import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="px-6 md:px-12 py-16 md:py-20 bg-cream">
      <div className="max-w-4xl mx-auto bg-charcoal text-cream rounded-3xl px-6 md:px-16 py-12 md:py-16 text-center relative overflow-hidden">

        {/* Decorative circles - subtle */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-coral/10 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-coral/10 rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-lg mx-auto">

          {/* Icon */}
          <div className="w-14 h-14 bg-coral rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
            ✉️
          </div>

          <div className="inline-flex items-center gap-2 bg-cream/10 px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-coral rounded-full animate-pulse"></span>
            <span className="font-body text-xs uppercase tracking-widest text-cream/80">
              Join 3,200+ subscribers
            </span>
          </div>

          <h2 className="font-display font-black text-2xl md:text-4xl uppercase mb-3 leading-tight">
            Get 15% Off Your First Order
          </h2>
          <p className="text-cream/60 mb-8 font-body text-sm md:text-base">
            Early access to drops, restocks, and summer style tips — straight to your inbox.
          </p>

          {subscribed ? (
            <div className="bg-coral/15 border border-coral/40 rounded-full px-6 py-4">
              <p className="font-body font-semibold text-coral text-sm md:text-base">
                ✓ You're subscribed! Check your inbox for your code.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-cream/10 border border-cream/20 outline-none placeholder:text-cream/40 focus:border-coral transition-colors font-body text-sm"
              />
              <button
                type="submit"
                className="bg-coral text-cream px-7 py-3.5 rounded-full font-body font-semibold text-sm hover:bg-cream hover:text-charcoal transition-colors cursor-pointer flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="font-body text-xs text-cream/30 mt-5">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;