// tailwind.config.js
export default {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    // Explicitly defining layer order to ensure utilities override base
    layers: {
      theme: {},
      base: {},
      components: {},
      utilities: {},
    },
    theme: {
      extend: {
        fontFamily: {
          'aeonik': ['Aeonik', 'sans-serif'],
          'inter': ['Inter', 'sans-serif'],
          'aeonik-fono': ['Aeonik-Fono', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };