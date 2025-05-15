<script setup>
import Header from '../components/MainHeader.vue';
import Logo from '../components/MainLogo.vue';
</script>

<template>
  <div class="location_body w-full min-h-screen px-4 py-4 md:px-8 md:py-8 flex flex-col text-raisin-black">
    <Header>
      <div class="location_title flex flex-col gap-4 min-h-[100%]">
        <div class="w-full max-w-[100%] md:max-w-[160px]">
        <Logo />
      </div>
        <h1 class="text-5xl !font-aeonik leading-[1em] tracking-[-0.025em] text-balance mt-auto">
          Goose Island. <br />Not just breweries anymore.
        </h1>
      </div>
    </Header>
    <div class="location_main flex flex-col pt-32 flex-grow justify-end items-stretch">
      
    </div>
  </div>
</template>

<style scoped>
:deep(.logo_link) {
  color: var(--color-raisin-black);
}

:deep(.nav-wrap) {
  --nav-link-text-hover: var(--color-columbia-blue);
}

:deep(.header_container) {
  @media only screen and (max-width: 64rem) {
    --nav-width: 100%;
    grid-template-columns: 1fr;
  }
}

</style>