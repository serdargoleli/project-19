/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // dark mod renkleri
        layoutBgDark: "#1a1a22",
        sidebarBgDark: "#15151b",

        // Light mod renkleri
        layoutBgLight: "#fbfbfb",
        sidebarBgLight: "#fbfbfb",

        textDark: "#EAEAEA", // Dark mod için metin rengi
        textLight: "#111827", // Light mod için metin rengi

        secondary: "#1D67FF", // Daha koyu canlı turkuaz tonlu renk
        orange: {
          50: "#8eb3ff",
          100: "#77a4ff",
          200: "#6195ff",
          300: "#4a85ff",
          400: "#3476ff",
          500: "#101727",
          600: "#1a5de6",
          700: "#1752cc",
          800: "#1448b3",
          900: "#113e99",
        },
      },
    },
  },

  plugins: [],
};
