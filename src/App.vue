<script setup>
import MainLayout from './layouts/MainLayout.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const transitionName = computed(() => 'page-transition')
</script>

<template>
  <MainLayout>
    <router-view v-slot="{ Component }">
      <transition 
        :name="transitionName" 
        mode="out-in"
        appear>
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
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
