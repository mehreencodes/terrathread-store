import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

function AccountSettings() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({ name: user?.name || "", email: user?.email || "" });
  const [saved, setSaved] = useState(false);
  // const [avatar, setAvatar] = useState(null);
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || null);
  const fileRef = useRef(null);

  if (!user) {
    return (
      <div className="pt-32 pb-20 px-6 text-center min-h-screen bg-cream">
        <h1 className="font-display font-black text-3xl uppercase text-charcoal mb-4">Please Log In</h1>
        <p className="text-charcoal/60 font-body">You need to be logged in to view account settings.</p>
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData.name, formData.email);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // const handleAvatar = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setAvatar(URL.createObjectURL(file));
  // };
const handleAvatar = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem('userAvatar', reader.result);
    };
    reader.readAsDataURL(file);
  }
};
  return (
    <div className="pt-28 pb-20 px-6 md:px-12 bg-cream min-h-screen">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="font-body text-xs uppercase tracking-widest font-bold mb-1" style={{ color: '#C96F4A' }}>
            My Account
          </p>
          <h1 className="font-display font-black text-3xl md:text-4xl uppercase text-charcoal">
            Account Settings
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Avatar section */}
          <div
            className="rounded-3xl p-7 flex items-center gap-6"
            style={{ background: '#F5F0E8' }}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
                style={{ background: '#A8553D' }}
              >
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display text-3xl font-black text-cream">
                    {formData.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {/* Camera button */}
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                style={{ background: '#2D2A26' }}
              >
                <i className="ti ti-camera" style={{ fontSize: '13px', color: '#FBF8F3' }} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleAvatar}
                className="hidden"
              />
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-lg text-charcoal truncate">{user.name}</p>
              <p className="font-body text-xs text-charcoal/50 truncate mb-3">{user.email}</p>
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="inline-flex items-center gap-1.5 font-body font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:opacity-80"
                style={{ background: '#A8553D', color: '#FBF8F3' }}
              >
                <i className="ti ti-upload" style={{ fontSize: '11px' }} />
                Upload Photo
              </button>
            </div>
          </div>

          {/* Form fields */}
          <div
            className="rounded-3xl p-7 flex flex-col gap-4"
            style={{ background: '#F5F0E8' }}
          >
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-charcoal/50">
              Personal Information
            </h3>

            <div>
              <label className="font-body text-xs font-bold text-charcoal uppercase tracking-wide mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-transparent outline-none focus:border-terracotta transition-colors font-body text-sm text-charcoal"
              />
            </div>

            <div>
              <label className="font-body text-xs font-bold text-charcoal uppercase tracking-wide mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-transparent outline-none focus:border-terracotta transition-colors font-body text-sm text-charcoal"
              />
            </div>
          </div>

          {/* Save button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-3 font-body font-bold uppercase tracking-widest rounded-full cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            style={{
              padding: '14px 28px',
              background: saved ? '#2D2A26' : '#A8553D',
              color: '#FBF8F3',
              fontSize: '12px',
            }}
          >
            {saved ? (
              <>
                <i className="ti ti-check" style={{ fontSize: '16px' }} />
                Changes Saved
              </>
            ) : (
              <>
                Save Changes
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                  style={{ background: '#C96F4A' }}
                >
                  <i className="ti ti-arrow-right" style={{ fontSize: '13px', color: '#FBF8F3' }} />
                </span>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AccountSettings;