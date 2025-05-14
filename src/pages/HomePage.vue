<script setup>
import HomepageNav from '../components/HomepageNav.vue';
import { onMounted, ref } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import AutoHeight from 'embla-carousel-auto-height';

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
  'Common Space',
  'Meeting Room',
  'Phone Booth',
  'Kitchen Area'
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
  const removeSelectedClasses = () => {
    emblaApi.slideNodes().forEach((slide) => {
      slide.classList.remove('is-selected')
    })
  }

  const addSelectedClass = () => {
    const selectedSlide = emblaApi.selectedScrollSnap()
    emblaApi.slideNodes()[selectedSlide].classList.add('is-selected')
  }

  emblaApi.on('select', () => {
    removeSelectedClasses()
    addSelectedClass()
  })

  // Initial setup
  addSelectedClass()
}

onMounted(() => {
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
    addScaleAnimation(emblaApi.value)

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

    return () => {
      cleanupButtons()
      cleanupProgress()
      emblaApi.value.off('select', updateSlideText)
    }
  }
})
</script>

<template>
  <div class="embla homepage-body relative z-2 w-full min-h-screen px-4 py-4 md:px-8 md:py-8 flex flex-col">
    <HomepageNav />
    <div class="flex flex-col gap-8 lg:grid lg:grid-cols-4 flex-grow ">
      <div class="flex flex-col flex-grow gap-12 items-start justify-end text-linen pt-12 lg:pt-48 lg:col-span-3">
        <h1 class="text-8xl leading-[0.875em] tracking-[-0.025em] text-balance">Small. Quiet. Built for people who
          actually work.</h1>
        <p class="text-xs leading-[1.25em] uppercase tracking-[0.025em] font-inter font-medium">16 fixed desks. No hot
          desk circus. <br />No desk thieves.</p>
      </div>
      <div class="flex flex-col gap-4 items-end justify-end text-linen">
        <div class="embla__controls grid grid-cols-4 gap-y-4 gap-x-2 w-full">
          <div class="embla__progress col-span-4" ref="progressNode">
            <div class="embla__progress__bar"></div>
          </div>
          <div class="text-sm m-0 col-span-2" ref="slideTextNode">Common Space</div>
          <div class="embla__buttons col-span-2 flex gap-12 justify-end">
            <button ref="prevBtn" class="embla__button embla__button--prev" type="button">
              <svg class="nav-link-arrow" width="0.875em" height="0.875em" viewBox="0 0 22 22" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 2L1.5 11L10.5 20" stroke="currentColor" stroke-width="2" />
                <path d="M22 11L2.5 11" stroke="currentColor" stroke-width="2" />
              </svg>
            </button>
            <button ref="nextBtn" class="embla__button embla__button--next" type="button">
              <svg class="nav-link-arrow" width="0.875em" height="0.875em" viewBox="0 0 22 22" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 11L0 11" stroke="currentColor" stroke-width="2" />
                <path d="M11.5 2L20.5 11L11.5 20" stroke="currentColor" stroke-width="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="homepage-embla-container">
    <div class="embla__viewport w-full h-full absolute top-0 left-0 z-0" ref="emblaRef">
      <div class="embla__container w-full h-full absolute top-0 left-0">
        <div class="embla__slide home-embla-slide" data-slide-name="Common Space">
          <img src="/images/homepage/home-bg-01.webp" alt="Common Space" class="w-full h-full object-cover" />
        </div>
        <div class="embla__slide home-embla-slide" data-slide-name="Meeting Room">
          <img src="/images/homepage/home-bg-02.webp" alt="Meeting Room" class="w-full h-full object-cover" />
        </div>
        <div class="embla__slide home-embla-slide" data-slide-name="Phone Booth">
          <img src="/images/homepage/home-bg-03.webp" alt="Phone Booth" class="w-full h-full object-cover" />
        </div>
        <div class="embla__slide home-embla-slide" data-slide-name="Kitchen Area">
          <img src="/images/homepage/home-bg-04.webp" alt="Kitchen Area" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage-body {
  --nav-link-bg: transparent;
  --nav-link-border: var(--color-linen);
  --nav-link-text: var(--color-linen);
  --nav-link-bg-hover: var(--color-linen);
  --nav-link-text-hover: var(--color-raisin-black);
  --nav-link-border-hover: transparent;
}

@keyframes scale-down {
  0% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.homepage-embla-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.homepage-embla-container:after {
  content: "";
  display: block;
  width: 100%;
  height: 33.33%;
  background-image:
    linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25));
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.homepage-embla-container:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--color-raisin-black);
  opacity: 0.1;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.embla {
  overflow: hidden;
}

.embla__container {
  display: flex;
  height: 100vh;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
  position: relative;
  height: 100%;
}

.embla__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  will-change: transform;
}

.embla__slide.is-selected img {
  animation: scale-down 6s linear forwards;
}

.embla__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  /* remove tap highlight */
  -webkit-tap-highlight-color: transparent;
  /* remove focus outline */
  outline: none;
  margin: 0;
  padding: 0;
}

/* Reset button outline on focus */
.embla__button:focus {
  outline: none;
}

.embla__progress {
  background-color: color-mix(in srgb, var(--color-linen) 20%, transparent);
  position: relative;
  height: 1px;
  justify-self: flex-end;
  align-self: center;
  width: 100%;
  overflow: hidden;
}

.embla__progress__bar {
  background-color: var(--color-linen);
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: -100%;
}

.embla__progress {
  justify-self: center;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
}

.embla__progress__bar {
  animation-name: autoplay-progress;
  animation-timing-function: linear;
  animation-iteration-count: 1;
}

@keyframes autoplay-progress {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>