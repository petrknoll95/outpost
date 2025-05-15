<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Map routes to background colors
const getBackgroundColor = (path) => {
  switch (path) {
    case '/':
      return 'bg-raisin-black'
    case '/space':
      return 'bg-timberwolf'
    case '/membership':
      return 'bg-timberwolf'
    case '/apply':
      return 'bg-raisin-black'
    case '/location':
      return 'bg-columbia-blue'
    default:
      return 'bg-linen'
  }
}

const backgroundColor = computed(() => getBackgroundColor(route.path))
</script>

<template>
  <div class="body_main min-h-screen flex flex-col w-full" :class="backgroundColor">
    <main class="flex-grow w-full">
      <slot />
    </main>
  </div>
</template>

<style>
/* Transition for the background color */
.body_main {
  transition: background-color 0.5s ease;
}
</style> 