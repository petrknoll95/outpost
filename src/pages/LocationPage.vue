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
      <div class="map-container mb-12">
        <h2 class="text-3xl mb-6 font-aeonik">Find Us</h2>
        <p class="mb-6 text-lg">1001 N N Branch St, Chicago, IL 60642</p>
        <div class="map-wrapper h-[400px] w-full overflow-hidden border border-columbia-blue">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.3071518054644!2d-87.64551552436725!3d41.90814467017693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33ad0b54b5d%3A0xf12a2e76e3b73b7!2s1001%20N%20Branch%20St%2C%20Chicago%2C%20IL%2060642!5e0!3m2!1sen!2sus!4v1715283940775!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
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

.map-container {
  max-width: 1000px;
  width: 100%;
}

.map-wrapper {
  position: relative;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.map-wrapper:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .map-wrapper {
    height: 300px;
  }
}
</style>