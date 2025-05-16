import { onMounted } from 'vue'
import { BlurryImageLoad } from '../blurry-load.js'

export function useBlurryLoad() {
  const initBlurryLoad = () => {
    const blurryImageLoad = new BlurryImageLoad();
    blurryImageLoad.load();
  }

  onMounted(() => {
    initBlurryLoad();
  })

  return {
    initBlurryLoad
  }
} 