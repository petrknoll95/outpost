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
    plugins: [],
  };