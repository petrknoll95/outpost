<script setup>
defineProps({
  variant: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light'].includes(value)
  },
  href: {
    type: String,
    default: '/'
  }
})
</script>

<template>
    <a class="main_button" :class="variant" :href="href">
        <span class="main_button_text">
            <slot></slot>
        </span>
        <span class="main_button_arrow">
            <svg class="nav-link-arrow" width="1em" height="1em" viewBox="0 0 22 22" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3171 4.68293L4 18M5.70732 4H18V16.2927" stroke="currentColor" stroke-width="2" />
            </svg>
        </span>
    </a>
</template>

<style scoped>
.main_button {
    --main-button-bg: transparent;
    --main-button-text: var(--color-raisin-black);
    --main-button-border: var(--color-raisin-black);
    --main-button-font-size: 1.25em;
    --main-button-height: 48px;
    --main-button-padding: 0 0.75em;
    font-family: 'Aeonik', sans-serif;
    font-size: var(--main-button-font-size);
    line-height: 1em;
    margin: 0;
    font-weight: 400;
    text-decoration: none;
    box-shadow: 0 0 0 1px inset currentColor;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: var(--main-button-padding);
    background-color: var(--main-button-bg);
    color: var(--main-button-text);
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s, width 0.4s, margin-left 0.4s, margin-right 0.4s, padding 0.2s;
    width: fit-content;
    gap: 1em;
    flex-wrap: nowrap;
    flex-shrink: 0;
    height: var(--main-button-height);
}

.main_button_text {
    margin-top: -0.25em;
}

.main_button.dark {
    --main-button-bg: transparent;
    --main-button-text: var(--color-raisin-black);
    --main-button-border: var(--color-raisin-black);
}

.main_button.light {
    --main-button-bg: transparent;
    --main-button-text: var(--color-linen);
    --main-button-border: var(--color-linen);
}

.main_button:hover.dark {
    --main-button-bg: var(--color-raisin-black);
    --main-button-text: var(--color-linen);
}

.main_button:hover.light {
    --main-button-bg: var(--color-linen);
    --main-button-text: var(--color-raisin-black);
}
</style>