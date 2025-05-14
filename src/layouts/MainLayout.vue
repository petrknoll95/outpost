<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

console.log('Current route:', route.path)
</script>

<template>
  <div class="min-h-screen flex flex-col w-full">
    <main class="flex-grow w-full">
      <slot />
    </main>
  </div>
</template> 