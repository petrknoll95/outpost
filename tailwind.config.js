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
          // These will now reference CSS variables defined in your theme layer
        },
      },
    },
    plugins: [],
  };