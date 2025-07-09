/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'selector', 
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#193cb8',
        // primary: '#2563eb',
        secondary: '#8ec5ff',
        accent: '#dce3f4',
        light: '#fafafa',
        dark: '#252525',
        disabledDark: '#767676',
        disabledLight: '#d1d5db',
      },
      fontFamily: {
        sans: ["Figtree-Reqular"], // Will become default
        medium: ["Figtree-Medium"],
        bold: ["Figtree-Bold"],
      },
    },
  },
  plugins: [],
};
