<script setup>
import Header from '../components/MainHeader.vue';
import Logo from '../components/MainLogo.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useSpaceCarousel } from '../scripts/useSpaceCarousel.js';

const {
  emblaRef,
  emblaApi,
  setupCarousel
} = useSpaceCarousel();

let cleanup = null;
const isMobile = ref(false);

const checkMobile = () => {
  const wasMobile = isMobile.value;
  isMobile.value = window.innerWidth < 768;
  
  // Handle transition from mobile to desktop
  if (wasMobile && !isMobile.value) {
    // Need to reinitialize carousel
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    
    // Use setTimeout to ensure DOM is updated before initializing
    setTimeout(() => {
      cleanup = setupCarousel();
    }, 50);
  }
  
  // Handle transition from desktop to mobile
  if (!wasMobile && isMobile.value) {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  if (!isMobile.value) {
    cleanup = setupCarousel();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
  if (cleanup) {
    cleanup();
  }
});

const carouselSlides = [
  {
    image: '/images/carousel/space-slider-01.webp',
    description: 'Dedicated workspaces for focused productivity'
  },
  {
    image: '/images/carousel/space-slider-02.webp',
    description: 'Collaborative meeting areas for team discussions'
  },
  {
    image: '/images/carousel/space-slider-03.webp',
    description: 'Comfortable lounge spaces for breaks and casual work'
  },
  {
    image: '/images/carousel/space-slider-04.webp',
    description: 'Modern amenities to support your workday'
  }
];
</script>

<template>
  <div class="space_body w-full min-h-screen px-4 py-4 md:px-8 md:py-8 flex flex-col">
    <Header>
      <div class="space_title flex flex-col gap-4 min-h-[100%]">
        <div class="w-full max-w-[100%] md:max-w-[160px]">
        <Logo />
      </div>
        <h1 class="text-6xl font-aeonik leading-[1em] tracking-[-0.025em] text-balance mt-auto">Designed for builders, thinkers, and people who show up.
        </h1>
      </div>
    </Header>
    <div class="space_main flex flex-col pt-32 flex-grow justify-end items-stretch">
      <!-- Desktop Carousel -->
      <div v-if="!isMobile" class="embla flex-grow">
        <div class="embla__viewport" ref="emblaRef">
          <div class="embla__container">
            <div class="embla__slide" v-for="slide in carouselSlides" :key="slide.image">
              <div class="slide-content">
                <img :src="slide.image" :alt="slide.description" class="slide-image">
                <div class="slide-description">
                  <p>{{ slide.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile Vertical Layout -->
      <div v-else class="mobile-images">
        <div class="mobile-slide" v-for="slide in carouselSlides" :key="slide.image">
          <div class="slide-content">
            <img :src="slide.image" :alt="slide.description" class="slide-image">
            <div class="slide-description">
              <p>{{ slide.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.logo_link) {
  color: var(--color-raisin-black);
}

:deep(.header_container) {
  @media only screen and (max-width: 64rem) {
    --nav-width: 100%;
    grid-template-columns: 1fr;
  }
}

.space_perks ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.space_perks ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding: 0.5em 0;
  border-top: 1px solid var(--color-raisin-black);
}

.space_perks ul li:last-child {
  padding: 0.5em 0 0 0;
}

.space_perks ul li img {
  width: 1.125em;
}

/* Embla Carousel Styles (Desktop) */
.embla {
  overflow: visible;
  width: 100%;
  margin-bottom: 2em;
  min-height: 560px;
  display: flex;
  flex-direction: column;
}

.embla__viewport {
  overflow: visible;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.embla__container {
  display: flex;
  flex-direction: row;
  gap: 0;
  align-items: stretch;
  justify-content: start;
  flex-grow: 1;
}

.embla__slide {
  flex: 0 0 80%;
  min-width: 0;
  position: relative;
  background-color: var(--color-raisin-black);
  display: flex;
  align-items: stretch;
  margin-right: 2em;
  @media (min-width: 768px) {
    flex: 0 0 50%;
  }
}

/* Mobile Vertical Layout */
.mobile-images {
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 100%;
}

.mobile-slide {
  width: 100%;
  height: 480px;
  background-color: var(--color-raisin-black);
  margin-bottom: 1rem;
}

/* Shared Styles */
.slide-content {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-description {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 2em;
  color: var(--color-linen);
  font-family: 'Aeonik', sans-serif;
  font-size: 0.9rem;
  line-height: 1.3;
}
</style>