<script setup>
import Header from '../components/MainHeader.vue';
import Logo from '../components/MainLogo.vue';
import ApplyForm from '../components/ApplyForm.vue';
</script>

<template>
  <div class="apply_body w-full min-h-screen px-4 py-4 md:px-8 md:py-8 flex flex-col">
    <Header>
      <div class="apply_title flex flex-col gap-4 min-h-[100%]">
        <div class="w-full max-w-[100%] md:max-w-[160px]">
        <Logo />
      </div>
        <h1 class="text-5xl !font-aeonik leading-[1em] tracking-[-0.025em] text-balance mt-auto max-w-[32ch]">
          If you're just looking for Wifi, this probably isn't for you.
        </h1>
      </div>
    </Header>
    <div class="flex flex-col flex-grow pt-32 items-stretch justify-end">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16 pt-16 border-t-[1px] border-linen">
      <div class="col-span-1 lg:col-span-1 flex flex-col gap-8 max-w-[40ch]">
        <h2 class="text-4xl !font-aeonik leading-[1em] tracking-[-0.025em] text-balance">
          This isn't a waitlist. <br />It's a filter.
        </h2>
        <p class="text-lg text-balance opacity-50">
          We'll be in touch within a few days. If it's a fit, we'll schedule a quick call or in-person visit.
        </p>
      </div>
      <div class="col-span-2 lg:col-span-2">
        <ApplyForm />
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
:deep(.logo_link) {
  color: var(--color-linen);
}

:deep(.nav-wrap) {
  --nav-link-text: var(--color-linen);
  --nav-link-text-hover: var(--color-raisin-black);
  --nav-link-border: var(--color-linen);
  --nav-link-border-hover: var(--color-linen);
  --nav-link-bg: transparent;
  --nav-link-bg-hover: var(--color-linen);
}

:deep(.header_container) {
  @media only screen and (max-width: 64rem) {
    --nav-width: 100%;
    grid-template-columns: 1fr;
  }
}

.apply_body {
  color: var(--color-linen);
}
</style>