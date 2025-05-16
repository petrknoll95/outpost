// Import font files
import aeonikRegular from './aeonik/Aeonik-Regular.woff2';
import aeonikRegularItalic from './aeonik/Aeonik-RegularItalic.woff2';
import aeonikMedium from './aeonik/Aeonik-Medium.woff2';
import aeonikBold from './aeonik/Aeonik-Bold.woff2';
import aeonikFonoRegular from './aeonik-fono/AeonikFono-Regular.otf';
import aeonikFonoMedium from './aeonik-fono/AeonikFono-Medium.otf';

// Function to set up font CSS variables
export function setupFonts() {
  const root = document.documentElement;
  
  // Set up Aeonik fonts
  root.style.setProperty('--font-aeonik-regular', `url("${aeonikRegular}") format("woff2")`);
  root.style.setProperty('--font-aeonik-regular-italic', `url("${aeonikRegularItalic}") format("woff2")`);
  root.style.setProperty('--font-aeonik-medium', `url("${aeonikMedium}") format("woff2")`);
  root.style.setProperty('--font-aeonik-bold', `url("${aeonikBold}") format("woff2")`);
  
  // Set up Aeonik Fono fonts
  root.style.setProperty('--font-aeonik-fono-regular', `url("${aeonikFonoRegular}") format("opentype")`);
  root.style.setProperty('--font-aeonik-fono-medium', `url("${aeonikFonoMedium}") format("opentype")`);
} 