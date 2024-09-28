/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        pgreen: "#A0E86F",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 5px 1px rgba(249, 115, 22, 0.5)",
          },
          "50%": {
            opacity: "0.5",
            boxShadow: "0 0 3px 0.5px rgba(249, 115, 22, 0.25)",
          },
        },
      },
    },
  },
  plugins: [],
};
