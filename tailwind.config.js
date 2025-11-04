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
          cyan: "#00faff",
          violet: "#9a4fff",
          amber: "#ffb300",
          light: "#E6F3FF",
        },
        dark: {
          primary: "#050508",
          secondary: "#0A080F",
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
