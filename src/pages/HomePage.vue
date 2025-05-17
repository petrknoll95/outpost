<script setup>
import Header from '../components/MainHeader.vue';
import Logo from '../components/MainLogo.vue';
import { onMounted, onUnmounted } from 'vue'
import { useEmblaCarousel } from '../scripts/useEmblaCarousel.js'
import { useBlurryLoad } from '../scripts/useBlurryLoad.js'

const {
  emblaRef,
  emblaApi,
  prevBtn,
  nextBtn,
  progressNode,
  slideTextNode,
  setupCarousel
} = useEmblaCarousel()

const { initBlurryLoad } = useBlurryLoad()

let cleanup = null

onMounted(() => {
  cleanup = setupCarousel()
  initBlurryLoad()
})

onUnmounted(() => {
  if (cleanup) {
    cleanup()
  }
})
</script>

<template>
  <div class="homepage-container">
    <div class="embla body-home relative z-2 w-full min-h-screen px-4 py-4 md:px-8 md:py-8 flex flex-col">
      <Header>
        <Logo />
      </Header>
      <div class="flex flex-col gap-8 lg:grid lg:grid-cols-4 flex-grow ">
      <div class="flex flex-col flex-grow gap-12 items-start justify-end text-linen pt-12 lg:pt-48 lg:col-span-3">
        <h1 class="text-8xl leading-[0.875em] tracking-[-0.025em] text-balance max-w-[18ch] font-aeonik">Home for creatives<br />building products and acquiring audience.</h1>
        <p class="text-xs leading-[1.25em] uppercase tracking-[0.025em] font-aeonik-fono font-medium">16 fixed desks. 5 podcast studios.<br />Immaculate vibes.</p>
      </div>
      <div class="flex flex-col gap-4 items-end justify-end text-linen">
        <div class="embla__controls grid grid-cols-4 gap-y-4 gap-x-2 w-full">
          <div class="embla__progress col-span-4" ref="progressNode">
            <div class="embla__progress__bar"></div>
          </div>
          <div class="text-sm m-0 col-span-2 font-aeonik-fono" ref="slideTextNode">Common Space</div>
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
        <div class="embla__slide home-embla-slide" data-slide-name="Open Workspace">
          <img 
            class="blurry-load w-full h-full object-cover" 
            src="/images/homepage/home-bg-03-small.webp" 
            data-large="/images/homepage/home-bg-03.webp" 
            alt="Common Space" 
          />
        </div>
        <div class="embla__slide home-embla-slide" data-slide-name="Kitchenette">
          <img 
            class="blurry-load w-full h-full object-cover" 
            src="/images/homepage/home-bg-02-small.webp" 
            data-large="/images/homepage/home-bg-02.webp" 
            alt="Meeting Room" 
          />
        </div>
        <div class="embla__slide home-embla-slide" data-slide-name="Lounge Area">
          <img 
            class="blurry-load w-full h-full object-cover" 
            src="/images/homepage/home-bg-01-small.webp" 
            data-large="/images/homepage/home-bg-01.webp" 
            alt="Phone Booth" 
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
/* STYLE OVERRIDES */
:deep(.header_container .nav-wrap) {
  --nav-link-bg: transparent;
  --nav-link-border: var(--color-linen);
  --nav-link-text: var(--color-linen);
  --nav-link-bg-hover: var(--color-linen);
  --nav-link-text-hover: var(--color-raisin-black);
  --nav-link-border-hover: transparent;
}

:deep(.header_container .logo_link) {
  color: var(--color-linen);
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

:deep(.logo_link) {
  color: var(--color-linen);
  justify-self: start;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  height: 100%;
}

:deep(.logo_svg) {
  contain: size;
  width: 100%;
  height: calc(123.5%);
}

@media only screen and (max-width: 64rem) {
  :deep(.logo_svg) {
    contain: none;
  }
}

.embla__viewport {
  opacity: 0;
  animation: fade-in 1s ease-out forwards;
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
  height: 100%;
  background-image:
    linear-gradient(to top, rgba(41, 37, 34, 0) 25%, rgba(41, 37, 34, 0.5));
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

@media only screen and (max-width: 32rem) {
  .homepage-embla-container:after {
    background-image: linear-gradient(to top, rgba(41, 37, 34, 0) 0%, rgba(41, 37, 34, 0.5) 75%);
  }
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
  transform: scale(1.05);
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