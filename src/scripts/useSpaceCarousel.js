import { ref } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

export function useSpaceCarousel() {
  const [emblaRef, emblaApi] = emblaCarouselVue({ 
    loop: false, 
    dragFree: false,
    align: 'start',
    containScroll: 'trimSnaps',
    skipSnaps: true
  }, [WheelGesturesPlugin()])

  const setupCarousel = () => {
    if (emblaApi.value) {
      return () => {
        // Cleanup function if needed
      }
    }
    return null
  }

  return {
    emblaRef,
    emblaApi,
    setupCarousel
  }
} 