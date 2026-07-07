function WhatsAppButton() {
  // Replace with your real WhatsApp business number (with country code, no + or spaces)
  const phoneNumber = "923001234567";
  const defaultMessage = "Hi! I have a question about a product on TerraThread.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 group"
      style={{
        width: "56px",
        height: "56px",
        background: "#25D366",
        boxShadow: "0 6px 20px rgba(37, 211, 102, 0.4)",
      }}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ background: "#25D366", opacity: 0.4 }}
      />

      {/* WhatsApp icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10"
      >
        <path
          d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.9 7.9 0 0 0-2.4-5.64Zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.58 6.58 0 0 1 10.32-8.13 6.53 6.53 0 0 1 1.94 4.66 6.6 6.6 0 0 1-6.66 6.56Zm3.6-4.93c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.19-.5.64-.62.77-.11.13-.23.15-.42.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.09-.4.1-.1.2-.23.3-.35.1-.11.13-.19.2-.32.06-.13.03-.24-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.37c-.13 0-.34.05-.52.24-.18.19-.68.67-.68 1.63 0 .96.7 1.89.8 2.02.1.13 1.38 2.1 3.34 2.95.47.2.83.32 1.12.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.09-.18-.14-.38-.24Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Tooltip on hover (desktop only) */}
      <span
        className="hidden md:block absolute right-full mr-3 whitespace-nowrap px-3 py-2 rounded-lg font-body text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "#2D2A26", color: "#FBF8F3" }}
      >
        Chat with us
      </span>
    </a>
  );
}

export default WhatsAppButton;