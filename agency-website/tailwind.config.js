/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        "deep-purple": "#6B2FD6",
        "electric-blue": "#00E5FF",
        "neon-pink": "#FF2E97",
        "cyber-yellow": "#FFD600",
        "ghost-white": "#F5F5F7",
        smoke: "rgba(255, 255, 255, 0.08)",
        background: "#050505",
        surface: "#0A0A0A",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        body: ["Satoshi", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)",
        "glass": "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: ".8", filter: "brightness(1.2)" },
        }
      }
    },
  },
  plugins: [],
}
