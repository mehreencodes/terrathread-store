export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: "#C96F4A",
        clay: "#A8553D",
        cream: "#FBF8F3",
        charcoal: "#2D2A26",
        sand: "#E8DCC8",
        coral: "#E8614A",      // ← add kiya
        skyblue: "#A8D8EA",    // ← add kiya
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
      keyframes: {             // ← theme.extend ke andar
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        barGrow: {
          from: { width: '0' },
          to:   { width: '103%' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      animation: {             // ← theme.extend ke andar
        'slide-left':  'slideInLeft 0.65s cubic-bezier(.22,1,.36,1) both',
        'slide-right': 'slideInRight 0.65s cubic-bezier(.22,1,.36,1) both',
        'bar-grow':    'barGrow 0.5s cubic-bezier(.22,1,.36,1) both',
        'fade-in':     'fadeIn 0.4s ease both',
      },
    },
  },
  plugins: [],
}

