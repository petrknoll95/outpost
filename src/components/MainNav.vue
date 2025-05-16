<template>
  <nav class="nav-wrap">
    <router-link class="nav-link nav-link-space" to="/space" active-class="active">
      <span class="nav-link-text">Space</span>
      <span>
        <svg class="nav-link-arrow" width="1em" height="1em" viewBox="0 0 22 22" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M17.3171 4.68293L4 18M5.70732 4H18V16.2927" stroke="currentColor" stroke-width="2" />
        </svg>
      </span>
    </router-link>
    <router-link class="nav-link nav-link-membership" to="/membership" active-class="active">
      <span class="nav-link-text">Membership</span>
      <span>
        <svg class="nav-link-arrow" width="1em" height="1em" viewBox="0 0 22 22" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5 11L0 11" stroke="currentColor" stroke-width="2" />
          <path d="M11.5 2L20.5 11L11.5 20" stroke="currentColor" stroke-width="2" />
        </svg>
      </span>
    </router-link>
    <router-link class="nav-link nav-link-location" to="/location" active-class="active">
      <span>
        <svg class="nav-link-arrow" width="1em" height="1em" viewBox="0 0 22 22" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 2L1.5 11L10.5 20" stroke="currentColor" stroke-width="2" />
          <path d="M22 11L2.5 11" stroke="currentColor" stroke-width="2" />
        </svg>
      </span>
      <span class="nav-link-text">Location</span>
    </router-link>
    <router-link class="nav-link nav-link-apply" to="/apply" active-class="active">
      <span>
        <svg class="nav-link-arrow" width="1em" height="1em" viewBox="0 0 22 22" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M4.68293 17.3171L18 4M16.2927 18H4V5.70732" stroke="currentColor" stroke-width="2" />
        </svg>
      </span>
      <span class="nav-link-text">Apply</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped>
.nav-wrap {
  --nav-link-bg: transparent;
  --nav-link-border: var(--color-raisin-black);
  --nav-link-text: var(--color-raisin-black);
  --nav-link-bg-hover: var(--color-raisin-black);
  --nav-link-text-hover: var(--color-linen);
  --nav-link-border-hover: transparent;
  flex-grow: 1;
  flex-shrink: 0;
  margin-left: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-link {
  --nav-link-font-size: 1.25em;
  --nav-link-height: 48px;
  --nav-link-padding: 0 0.75em;
  font-family: 'Aeonik', sans-serif;
  font-size: var(--nav-link-font-size);
  line-height: 1em;
  margin: 0;
  font-weight: 400;
  text-decoration: none;
  box-shadow: 0 0 0 1px inset currentColor;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--nav-link-padding);
  background-color: var(--nav-link-bg);
  color: var(--nav-link-text);
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s, width 0.4s, margin-left 0.4s, margin-right 0.4s, padding 0.2s;
  width: fit-content;
  gap: 1em;
  flex-wrap: nowrap;
  flex-shrink: 0;
  height: var(--nav-link-height);
  /* Disable tap highlight on mobile */
  -webkit-tap-highlight-color: transparent;
}

@media only screen and (max-width: 40rem) {
  .nav-link {
    --nav-link-font-size: 1em;
    --nav-link-height: 40px;
    --nav-link-padding: 0 0.5em;
  }
}

.nav-link span {
  flex-shrink: 0;
}

/* Specific widths for each link */
.nav-link-space {
  width: 75%;
  margin-left: auto;
}

.nav-link-membership {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.nav-link-location {
  width: 60%;
  margin-left: 0;
}

.nav-link-apply {
  width: 60%;
  margin-left: 0;
}

/* Hover state - only on non-touch devices */
@media (hover: hover) {
  .nav-wrap:has(.nav-link:hover) .nav-link,
  .nav-wrap:hover .nav-link {
    width: 100%;
  }

  .nav-link:hover {
    background-color: var(--nav-link-bg-hover);
    color: var(--nav-link-text-hover);
    box-shadow: 0 0 0 1px inset var(--nav-link-border-hover);
    padding: 0 1em;
  }

}

.nav-link.active {
  background-color: var(--nav-link-bg-hover);
  color: var(--nav-link-text-hover);
  box-shadow: 0 0 0 1px inset var(--nav-link-border-hover);
  padding: 0 1em;
}

.nav-link-text {
  display: flow-root;
}

.nav-link-text::before {
  content: '';
  display: table;
  margin-bottom: calc(-0.5lh + 0.31em);
}

.nav-link-text::after {
  content: '';
  display: table;
  margin-top: calc(-0.5lh + 0.4em);
}
</style>