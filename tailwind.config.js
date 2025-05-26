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
        // primary: '#1974fe',
        secondary: '#8ec5ff', 
      },
    },
  },
  plugins: [],
};
