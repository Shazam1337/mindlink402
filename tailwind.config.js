/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00E5FF",
          purple: "#9C27FF",
          light: "#E6F3FF",
        },
        dark: {
          primary: "#050A0F",
          secondary: "#0F1B2A",
        },
      },
      fontFamily: {
        heading: ['Orbitron', 'Rajdhani', 'sans-serif'],
        body: ['Space Grotesk', 'Inter', 'sans-serif'],
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
