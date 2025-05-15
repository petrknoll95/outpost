<script setup>
import MainLayout from './layouts/MainLayout.vue'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useMeta } from 'vue-meta'

const route = useRoute()
const transitionName = computed(() => 'page-transition')

// Setup meta tags
useMeta({
  title: computed(() => route.meta.title || 'OUTPOST - A workspace for people who actually work'),
  meta: computed(() => {
    if (!route.meta) return []
    
    return [
      { name: 'description', content: route.meta.description },
      { name: 'keywords', content: route.meta.keywords },
      { property: 'og:title', content: route.meta.ogTitle },
      { property: 'og:description', content: route.meta.ogDescription },
      { property: 'og:image', content: route.meta.ogImage },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: route.meta.ogTitle },
      { name: 'twitter:description', content: route.meta.ogDescription },
      { name: 'twitter:image', content: route.meta.ogImage }
    ].filter(meta => meta.content) // Filter out undefined meta values
  })
})
</script>

<template>
  <MainLayout>
    <transition 
      :name="transitionName" 
      mode="out-in"
      appear>
      <router-view :key="route.path" />
    </transition>
  </MainLayout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* Page transition styles */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.4s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
}
</style>
