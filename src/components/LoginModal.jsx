import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function LoginModal({ isOpen, onClose }) {
  const { signup, login, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let result;
    if (mode === "signup") {
      result = await signup(formData.name, formData.email, formData.password);
    } else {
      result = await login(formData.email, formData.password);
    }

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } else {
      setError(result.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1200);
      } else {
        setError(result.message);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: 'rgba(45,42,38,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-cream rounded-3xl p-8 md:p-10 max-w-md w-full relative"
        style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center hover:bg-sand transition-colors cursor-pointer"
        >
          <i className="ti ti-x" style={{ fontSize: '18px', color: '#2D2A26' }} />
        </button>

        {success ? (
          <div className="text-center py-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: '#A8553D' }}
            >
              <i className="ti ti-check" style={{ fontSize: '28px', color: '#FBF8F3' }} />
            </div>
            <h2 className="font-display uppercase text-2xl text-charcoal">
              {mode === "signup" ? "Account Created!" : "Welcome Back!"}
            </h2>
            <p className="font-body text-charcoal/50 text-sm mt-2">You're now logged in.</p>
          </div>
        ) : (
          /* ── Login / Signup form ── */
          <>
            <h2 className="font-display font-black text-3xl uppercase text-charcoal mb-1">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="font-body text-charcoal/50 text-sm mb-6">
              {mode === "signup"
                ? "Sign up to start shopping with TerraThread."
                : "Log in to track orders and save favorites."}
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-cream rounded-full py-3.5 font-body font-semibold text-charcoal hover:bg-sand transition-colors cursor-pointer mb-5 disabled:opacity-50"
              style={{ border: '1.5px solid #E8DCC8' }}
            >
              {googleLoading ? (
                <>
                  <div
                    className="w-4 h-4 rounded-full border-2 animate-spin"
                    style={{ borderColor: '#E8DCC8', borderTopColor: '#A8553D' }}
                  />
                  Signing you in...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-charcoal/10"></div>
              <span className="font-body text-xs text-charcoal/40 uppercase">or</span>
              <div className="flex-1 h-px bg-charcoal/10"></div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === "signup" && (
                <div>
                  <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <i className="ti ti-user absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '16px', color: '#9A948D' }} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl font-body text-sm text-charcoal outline-none transition-colors"
                      style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                      onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                      onBlur={(e) => e.target.style.borderColor = 'transparent'}
                      placeholder="Sara Ahmed"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">Email</label>
                <div className="relative">
                  <i className="ti ti-mail absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '16px', color: '#9A948D' }} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl font-body text-sm text-charcoal outline-none transition-colors"
                    style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                    onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-xs font-bold uppercase tracking-wide text-charcoal/60 mb-1.5 block">Password</label>
                <div className="relative">
                  <i className="ti ti-lock absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '16px', color: '#9A948D' }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full pl-11 pr-11 py-3 rounded-xl font-body text-sm text-charcoal outline-none transition-colors"
                    style={{ background: '#F5F0E8', border: '2px solid transparent' }}
                    onFocus={(e) => e.target.style.borderColor = '#A8553D'}
                    onBlur={(e) => e.target.style.borderColor = 'transparent'}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <i className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'}`} style={{ fontSize: '16px', color: '#9A948D' }} />
                  </button>
                </div>
                {mode === "signup" && (
                  <p className="font-body text-[10px] text-charcoal/40 mt-1.5">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              {mode === "login" && (
                <button type="button" className="font-body text-xs font-bold text-right cursor-pointer self-end" style={{ color: '#A8553D' }}>
                  Forgot password?
                </button>
              )}

              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(220,38,38,0.08)' }}>
                  <i className="ti ti-alert-circle" style={{ fontSize: '14px', color: '#DC2626' }} />
                  <p className="font-body text-xs font-bold" style={{ color: '#DC2626' }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="font-body font-bold uppercase text-xs tracking-widest py-3.5 rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 mt-1 hover:opacity-90"
                style={{ background: '#A8553D', color: '#FBF8F3' }}
              >
                {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Log In"}
              </button>
            </form>

            <p className="font-body text-sm text-charcoal/50 text-center mt-5">
              {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={() => switchMode(mode === "signup" ? "login" : "signup")}
                className="font-bold cursor-pointer hover:underline"
                style={{ color: '#A8553D' }}
              >
                {mode === "signup" ? "Log in" : "Sign up"}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginModal;