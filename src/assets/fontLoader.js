// Import font files
import aeonikRegular from './aeonik/Aeonik-Regular.woff2';
import aeonikRegularItalic from './aeonik/Aeonik-RegularItalic.woff2';
import aeonikMedium from './aeonik/Aeonik-Medium.woff2';
import aeonikBold from './aeonik/Aeonik-Bold.woff2';
import aeonikFonoRegular from './aeonik-fono/AeonikFono-Regular.otf';
import aeonikFonoMedium from './aeonik-fono/AeonikFono-Medium.otf';

// Import Inter fonts
import interRegular from './inter/Inter-Regular.woff2';
import interMedium from './inter/Inter-Medium.woff2';
import interSemiBold from './inter/Inter-SemiBold.woff2';
import interBold from './inter/Inter-Bold.woff2';

// Function to set up font CSS variables
export function setupFonts() {
  const root = document.documentElement;
  
  try {
    console.log('Setting up fonts...');
    
    // Log font URLs to verify they're being imported correctly
    console.log('Font URLs:', {
      aeonikRegular,
      aeonikFonoRegular,
      interRegular
    });

    // Set up Inter fonts
    root.style.setProperty('--font-inter-regular', `url("${interRegular}") format("woff2")`);
    root.style.setProperty('--font-inter-medium', `url("${interMedium}") format("woff2")`);
    root.style.setProperty('--font-inter-semibold', `url("${interSemiBold}") format("woff2")`);
    root.style.setProperty('--font-inter-bold', `url("${interBold}") format("woff2")`);
    
    // Set up Aeonik fonts
    root.style.setProperty('--font-aeonik-regular', `url("${aeonikRegular}") format("woff2")`);
    root.style.setProperty('--font-aeonik-regular-italic', `url("${aeonikRegularItalic}") format("woff2")`);
    root.style.setProperty('--font-aeonik-medium', `url("${aeonikMedium}") format("woff2")`);
    root.style.setProperty('--font-aeonik-bold', `url("${aeonikBold}") format("woff2")`);
    
    // Set up Aeonik Fono fonts
    root.style.setProperty('--font-aeonik-fono-regular', `url("${aeonikFonoRegular}") format("opentype")`);
    root.style.setProperty('--font-aeonik-fono-medium', `url("${aeonikFonoMedium}") format("opentype")`);

    // Verify that the CSS variables were set correctly
    const styles = getComputedStyle(root);
    console.log('Font CSS variables set:', {
      aeonikRegular: styles.getPropertyValue('--font-aeonik-regular'),
      aeonikFonoRegular: styles.getPropertyValue('--font-aeonik-fono-regular'),
      interRegular: styles.getPropertyValue('--font-inter-regular')
    });

    console.log('Fonts setup completed successfully');
  } catch (error) {
    console.error('Error setting up fonts:', error);
  }
} 