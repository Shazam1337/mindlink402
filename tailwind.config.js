/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mythos: {
          gold: "#FFD700",
          turquoise: "#00FFF6",
          purple: "#C77DFF",
          light: "#E6F3FF",
        },
        dark: {
          primary: "#000000",
          secondary: "#0A0500",
        },
      },
      fontFamily: {
        heading: ['Orbitron', 'Exo', 'sans-serif'],
        body: ['Inter', 'Urbanist', 'sans-serif'],
      },
      animation: {
        'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
        'holographic': 'holographic-sweep 3s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
