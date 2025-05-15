import { ref } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import AutoHeight from 'embla-carousel-auto-height'

export function useEmblaCarousel() {
  const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }), 
    Fade(),
    AutoHeight()
  ])
  const prevBtn = ref(null)
  const nextBtn = ref(null)
  const progressNode = ref(null)
  const slideTextNode = ref(null)

  const slideNames = [
    'Open Workspace',
    'Kitchenette with dining area',
    'Lounge area'
  ]

  const updateSlideText = () => {
    if (emblaApi.value && slideTextNode.value) {
      const currentIndex = emblaApi.value.selectedScrollSnap()
      slideTextNode.value.textContent = slideNames[currentIndex]
    }
  }

  const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
    const togglePrevNextBtnsState = () => {
      if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled')
      else prevBtn.setAttribute('disabled', 'disabled')

      if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled')
      else nextBtn.setAttribute('disabled', 'disabled')
    }

    emblaApi
      .on('select', togglePrevNextBtnsState)
      .on('init', togglePrevNextBtnsState)
      .on('reInit', togglePrevNextBtnsState)

    return () => {
      prevBtn.removeAttribute('disabled')
      nextBtn.removeAttribute('disabled')
    }
  }

  const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
    const scrollPrev = () => {
      emblaApi.scrollPrev()
      const autoplay = emblaApi?.plugins()?.autoplay
      if (autoplay) {
        autoplay.reset()
      }
      updateSlideText()
    }
    const scrollNext = () => {
      emblaApi.scrollNext()
      const autoplay = emblaApi?.plugins()?.autoplay
      if (autoplay) {
        autoplay.reset()
      }
      updateSlideText()
    }
    prevBtn.addEventListener('click', scrollPrev, false)
    nextBtn.addEventListener('click', scrollNext, false)

    const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
      emblaApi,
      prevBtn,
      nextBtn
    )

    return () => {
      removeTogglePrevNextBtnsActive()
      prevBtn.removeEventListener('click', scrollPrev, false)
      nextBtn.removeEventListener('click', scrollNext, false)
    }
  }

  const addAutoplayProgressListeners = (emblaApi, progressNode) => {
    const progressBarNode = progressNode.querySelector('.embla__progress__bar')

    let animationName = ''
    let timeoutId = 0
    let rafId = 0

    const startProgress = (emblaApi) => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      const timeUntilNext = autoplay.timeUntilNext()
      if (timeUntilNext === null) return

      if (!animationName) {
        const style = window.getComputedStyle(progressBarNode)
        animationName = style.animationName
      }

      progressBarNode.style.animationName = 'none'
      progressBarNode.style.transform = 'translate3d(0,0,0)'

      rafId = window.requestAnimationFrame(() => {
        timeoutId = window.setTimeout(() => {
          progressBarNode.style.animationName = animationName
          progressBarNode.style.animationDuration = `${timeUntilNext}ms`
        }, 0)
      })

      progressNode.classList.remove('embla__progress--hidden')
    }

    const stopProgress = (emblaApi) => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      progressNode.classList.add('embla__progress--hidden')
    }

    emblaApi
      .on('autoplay:timerset', startProgress)
      .on('autoplay:timerstopped', stopProgress)

    return () => {
      emblaApi
        .off('autoplay:timerset', startProgress)
        .off('autoplay:timerstopped', stopProgress)
    }
  }

  const addScaleAnimation = (emblaApi) => {
    const scaleNodes = emblaApi.slideNodes().map(slide => slide.querySelector('img'))
    
    const startScale = () => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      const timeUntilNext = autoplay.timeUntilNext()
      if (timeUntilNext === null) return

      const selectedSlide = emblaApi.selectedScrollSnap()
      const selectedNode = scaleNodes[selectedSlide]
      
      if (selectedNode) {
        selectedNode.style.transition = 'none'
        selectedNode.style.transform = 'scale(1.05)'
        
        requestAnimationFrame(() => {
          setTimeout(() => {
            selectedNode.style.transition = `transform ${timeUntilNext}ms linear`
            selectedNode.style.transform = 'scale(1)'
          }, 0)
        })
      }
    }

    const stopScale = () => {
      scaleNodes.forEach(node => {
        if (node) {
          node.style.transition = 'none'
          node.style.transform = 'scale(1.05)'
        }
      })
    }

    emblaApi
      .on('autoplay:timerset', startScale)
      .on('autoplay:timerstopped', stopScale)
      .on('select', startScale)

    return () => {
      emblaApi
        .off('autoplay:timerset', startScale)
        .off('autoplay:timerstopped', stopScale)
        .off('select', startScale)
    }
  }

  // Debounce function to limit resize handler calls
  const debounce = (fn, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }

  // Handle window resize
  const handleResize = debounce(() => {
    if (emblaApi.value) {
      emblaApi.value.reInit()
    }
  }, 250)

  const setupCarousel = () => {
    if (emblaApi.value) {
      console.log(emblaApi.value.slideNodes()) // Access API
      const cleanupButtons = addPrevNextBtnsClickHandlers(
        emblaApi.value,
        prevBtn.value,
        nextBtn.value
      )
      const cleanupProgress = addAutoplayProgressListeners(
        emblaApi.value,
        progressNode.value
      )

      // Add scale animation
      const cleanupScale = addScaleAnimation(emblaApi.value)

      // Add select listener for autoplay slide changes
      emblaApi.value.on('select', updateSlideText)

      // Set initial slide text
      updateSlideText()

      // Trigger initial progress animation
      const autoplay = emblaApi.value?.plugins()?.autoplay
      if (autoplay) {
        setTimeout(() => {
          autoplay.reset()
        }, 0)
      }

      // Add resize event listener
      window.addEventListener('resize', handleResize)

      return () => {
        cleanupButtons()
        cleanupProgress()
        cleanupScale()
        emblaApi.value.off('select', updateSlideText)
        window.removeEventListener('resize', handleResize)
      }
    }
  }

  return {
    emblaRef,
    emblaApi,
    prevBtn,
    nextBtn,
    progressNode,
    slideTextNode,
    setupCarousel
  }
} 