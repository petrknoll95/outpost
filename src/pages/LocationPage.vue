<script setup>
import Header from '../components/MainHeader.vue';
import Logo from '../components/MainLogo.vue';
import Map from '../components/map/Map.vue';
import mapStyle from '../components/map/style.json';
import Button from '../components/MainButton.vue';

// Coordinates for 1001 N North Branch St, Chicago, IL 60642, USA
const chicagoCoordinates = [-87.65129737026611, 41.9011667828004];
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
    <div class="location_main_wrapper pt-16 pb-16 lg:pb-0 flex flex-col flex-grow justify-end items-stretch">
      <div class="location_main flex flex-col lg:grid lg:grid-cols-2 gap-8">
        <div class="map-wrapper w-full h-auto aspect-[4/3]">
          <Map 
            :center="chicagoCoordinates" 
            :zoom="14"
            :style="mapStyle"
            :marker-width="80"
            :marker-height="80"
            marker-link="https://www.google.com/maps/place/1001+N+North+Branch+St,+Chicago,+IL+60642/"
          />
        </div>
        <div class="location-info flex flex-col gap-6">
          <h2 class="text-4xl !font-aeonik leading-[1em] tracking-[-0.025em] text-balance mt-auto">
            1001 N North Branch St, <br />Chicago, IL
          </h2>
          <p class="text-sm font-aeonik-fono max-w-[60ch]">
            1001 North Branch is a redevelopment of the former Peck & Hills Furniture Building in Chicago's Goose Island. Located on North Branch Street, two blocks west of Halsted.
          </p>
            <Button href="https://www.google.com/maps/place/1001+N+North+Branch+St,+Chicago,+IL+60642/" target="_blank">
              <span class="text-sm font-aeonik-fono">
                View on Google Maps
              </span>
            </Button>
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

:deep(.main_button:hover.dark) {
    box-shadow: none;
    color: var(--color-columbia-blue)
}
</style>