<script setup>
import Nav from './MainNav.vue';
</script>

<template>
    <div class="header_container">
        <slot></slot>
        <Nav />
    </div>
</template>

<style scoped>
.header_container {
    --nav-width: 400px;
    display: grid;
    grid-template-columns: 1fr var(--nav-width);
    align-items: start;
    justify-content: space-between;
    column-gap: 5%;
    row-gap: 2em;
}

@media only screen and (max-width: 40rem) { 
    .header_container {
        --nav-width: 100%;
        grid-template-columns: 1fr;
    }
}
</style>