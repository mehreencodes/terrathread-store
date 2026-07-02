import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
const [submitted, setSubmitted] = useState(false);
const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await fetch("https://formspree.io/f/mpwlwgbr", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (err) {
    console.error(err);
  }
setSubmitted(true);
setShowModal(true);
setFormData({ name: "", email: "", message: "" });
};

  return (
    <div className="bg-cream min-h-screen">

      {/* Hero with decorative shapes */}
      <section className="relative px-6 md:px-12 pt-32 pb-16 overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 bg-skyblue/40 rounded-full blur-2xl"></div>
        <div className="absolute top-40 left-0 w-24 h-24 bg-coral/20 rounded-full blur-xl"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-charcoal text-cream px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 bg-coral rounded-full animate-pulse"></span>
            <p className="font-body text-xs uppercase tracking-widest font-semibold">
              We usually reply within 24h
            </p>
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl uppercase text-charcoal mb-4">
            Let's Talk
          </h1>
          <p className="text-charcoal/60 font-body max-w-md mx-auto">
            Questions about an order, sizing, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="px-6 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">

          <div className="grid md:grid-cols-2 gap-8">

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-cream rounded-3xl p-8 flex flex-col gap-4 border border-charcoal/10 shadow-sm">
              <h2 className="font-display uppercase text-xl text-charcoal mb-2">Send A Message</h2>

              <div>
                <label className="font-body text-sm font-semibold text-charcoal mb-1.5 block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-sand border border-transparent outline-none focus:border-coral transition-colors font-body"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="font-body text-sm font-semibold text-charcoal mb-1.5 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-sand border border-transparent outline-none focus:border-coral transition-colors font-body"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="font-body text-sm font-semibold text-charcoal mb-1.5 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-sand border border-transparent outline-none focus:border-coral transition-colors font-body resize-none"
                  placeholder="How can we help?"
                />
              </div>

     <button
  type="submit"
  className="w-full inline-flex items-center justify-center gap-3 font-body font-bold uppercase tracking-widest rounded-full cursor-pointer mt-2 group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
  style={{ padding: '14px 28px', background: '#A8553D', color: '#FBF8F3', fontSize: '12px' }}
>
  Send Message
  <span
    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
    style={{ background: '#C96F4A' }}
  >
    <i className="ti ti-send" style={{ fontSize: '13px', color: '#FBF8F3' }} />
  </span>
</button>
            </form>

        {/* Info column */}
<div className="flex flex-col gap-5">

  {/* Contact card */}
  <div
    className="rounded-3xl p-8 relative overflow-hidden"
    style={{ background: '#2D2A26' }}
  >
    <div
      className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full pointer-events-none"
      style={{ background: 'rgba(168,85,61,0.12)' }}
    />
    <div
      className="absolute -top-6 -left-6 w-24 h-24 rounded-full pointer-events-none"
      style={{ background: 'rgba(201,111,74,0.06)' }}
    />

    <h3 className="font-display uppercase text-lg text-cream mb-6 relative z-10">
      Reach Us Directly
    </h3>

    <div className="flex flex-col gap-4 relative z-10">
      {[
        { icon: "ti-mail", label: "Email Us", value: "support@terrathread.com" },
        { icon: "ti-phone", label: "Call Us", value: "+1 234 567 890" },
        { icon: "ti-map-pin", label: "Visit Us", value: "123 Summer Ave, Style City" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(168,85,61,0.25)' }}
          >
            <i className={`ti ${item.icon}`} style={{ fontSize: '17px', color: '#C96F4A' }} />
          </div>
          <div>
            <p className="font-body text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: 'rgba(251,248,243,0.4)' }}>
              {item.label}
            </p>
            <p className="font-body text-sm text-cream">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Business hours */}
  <div
    className="rounded-3xl p-8"
    style={{ background: '#F5F0E8' }}
  >
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: '#A8553D' }}
      >
        <i className="ti ti-clock" style={{ fontSize: '16px', color: '#FBF8F3' }} />
      </div>
      <h3 className="font-display uppercase text-base text-charcoal">Business Hours</h3>
    </div>

    <div className="flex flex-col gap-0">
      {[
        { day: "Monday – Friday", hours: "9am – 6pm", open: true },
        { day: "Saturday", hours: "10am – 4pm", open: true },
        { day: "Sunday", hours: "Closed", open: false },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-3"
          style={{ borderBottom: i < 2 ? '1px solid rgba(45,42,38,0.08)' : 'none' }}
        >
          <span className="font-body text-sm text-charcoal/70">{item.day}</span>
          <span
            className="font-body font-bold text-xs px-3 py-1 rounded-full"
            style={{
              background: item.open ? 'rgba(168,85,61,0.1)' : 'rgba(45,42,38,0.06)',
              color: item.open ? '#A8553D' : '#9A948D',
            }}
          >
            {item.hours}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* FAQ teaser */}
  <div
    className="rounded-3xl p-8 flex items-start gap-4"
    style={{ background: '#A8553D' }}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
      style={{ background: 'rgba(251,248,243,0.15)' }}
    >
      <i className="ti ti-help" style={{ fontSize: '18px', color: '#FBF8F3' }} />
    </div>
    <div>
      <h3 className="font-display uppercase text-base text-cream mb-2">Quick Answers</h3>
      <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(251,248,243,0.7)' }}>
        Looking for order status or return info? Most questions are answered in our shipping policy — feel free to message us anyway!
      </p>
    </div>
  </div>

</div>
          </div>
        </div>
      </div>
      {/* Thank You Modal */}
{showModal && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: 'rgba(45,42,38,0.6)', backdropFilter: 'blur(6px)' }}
    onClick={() => setShowModal(false)}
  >
    <div
      className="bg-cream rounded-3xl p-10 w-full max-w-md text-center relative"
      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-sand transition-colors cursor-pointer"
      >
        <i className="ti ti-x" style={{ fontSize: '16px', color: '#2D2A26' }} />
      </button>

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{ background: '#A8553D' }}
      >
        <i className="ti ti-check" style={{ fontSize: '28px', color: '#FBF8F3' }} />
      </div>

      {/* Text */}
      <h3 className="font-display font-black text-2xl uppercase text-charcoal mb-2">
        Message Sent!
      </h3>
      <p className="font-body text-sm text-charcoal/60 leading-relaxed mb-2">
        Thank you for reaching out to <strong className="text-charcoal">TerraThread</strong>.
      </p>
      <p className="font-body text-sm text-charcoal/60 leading-relaxed mb-6">
        We'll get back to you within <strong className="text-charcoal">24 hours</strong>. We appreciate your message!
      </p>

      {/* Divider */}
      <div className="h-px bg-charcoal/10 mb-6" />

      {/* Close btn */}
      <button
        onClick={() => setShowModal(false)}
        className="w-full py-3.5 rounded-full font-body font-bold text-sm uppercase tracking-widest text-cream transition-all duration-300 hover:opacity-90 cursor-pointer"
        style={{ background: '#A8553D' }}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default Contact;