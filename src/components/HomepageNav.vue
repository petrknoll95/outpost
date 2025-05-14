<template>
    <div class="nav-header">
        <a class="main-logo" href="/">
            <svg class="main-logo-svg" width="1208" height="100%" viewBox="0 0 1208 280" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M616 54C665.153 54.0003 705 93.8469 705 143C705 192.153 665.153 232 616 232C595.694 232 576.976 225.199 562 213.752V280H526V58H562V72.248C576.976 60.8006 595.694 54 616 54ZM616 90C586.729 90 563 113.729 563 143C563 172.271 586.729 196 616 196C645.271 196 669 172.271 669 143C669 113.729 645.271 90.0003 616 90Z" fill="currentColor" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M89 53.999C138.153 53.9993 178 93.847 178 143C178 192.153 138.153 232 89 232C39.8469 232 0.000263923 192.153 0 143C0.000197917 93.8469 39.8468 53.9991 89 53.999ZM89 90C59.7291 90.0001 36.0002 113.729 36 143C36.0003 172.271 59.7291 196 89 196C118.271 196 142 172.271 142 143C142 113.729 118.271 90.0003 89 90Z" fill="currentColor" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M815 54C864.153 54.0003 904 93.8468 904 143C904 192.153 864.153 232 815 232C765.847 232 726 192.153 726 143C726 93.8467 765.847 54 815 54ZM815 90C785.729 90 762 113.729 762 143C762 172.271 785.729 196 815 196C844.271 196 868 172.271 868 143C868 113.729 844.271 90.0003 815 90Z" fill="currentColor" />
                <path d="M234.162 192H328.162V58H364.162V228H198.162V58H234.162V192Z" fill="currentColor" />
                <path d="M432 58H494V94H432V192H494V228H396V0H432V58Z" fill="currentColor" />
                <path d="M1082 94H962V125H1082V228H926V192H1046V161H926V58H1082V94Z" fill="currentColor" />
                <path d="M1146 58H1208V94H1146V192H1208V228H1110V0H1146V58Z" fill="currentColor" />
            </svg>
        </a>
        <nav class="nav-wrap">
            <a class="nav-link nav-link-space" href="/space">
                <span class="nav-link-text">Space</span>
                <span>
                    <svg class="nav-link-arrow" width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3171 4.68293L4 18M5.70732 4H18V16.2927" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </span>
            </a>
            <a class="nav-link nav-link-membership" href="/membership">
                <span class="nav-link-text">Membership</span>
                <span>
                    <svg class="nav-link-arrow" width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 11L0 11" stroke="currentColor" stroke-width="2"/>
                        <path d="M11.5 2L20.5 11L11.5 20" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </span>
            </a>
            <a class="nav-link nav-link-location" href="/location">
                <span>
                    <svg class="nav-link-arrow" width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 2L1.5 11L10.5 20" stroke="currentColor" stroke-width="2"/>
                        <path d="M22 11L2.5 11" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </span>
                <span class="nav-link-text">Location</span>
            </a>
            <a class="nav-link nav-link-apply" href="/apply">
                <span>
                    <svg class="nav-link-arrow" width="1em" height="1em" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.68293 17.3171L18 4M16.2927 18H4V5.70732" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </span>
                <span class="nav-link-text">Apply</span>
            </a>
        </nav>
    </div>
</template>

<script setup>
</script>

<style scoped>
.nav-header {
  --nav-link-height: 48px;
  --nav-link-gap: 3px;
  --main-logo-height: calc(var(--nav-link-height) * 4 + var(--nav-link-gap) * 3);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr fit-content(0px);
  align-items: start;
  gap: 2rem;
}

.main-logo {
  color: var(--color-linen);
  justify-self: start;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  height: 100%;
}

.main-logo-svg {
  contain: size;
  width: 100%;
  height: calc(123.5%);
}

.nav-wrap {
  flex-grow: 1;
  flex-shrink: 0;
  margin-left: auto;
  min-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--nav-link-gap);
}

@media only screen and (max-width: 64rem) { 
    .nav-header {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    .main-logo-svg {
        contain: none;
    }
    .nav-wrap {
        min-width: 0;
        width: 56.5%;
        margin-left: auto;
    }
}

@media only screen and (max-width: 48rem) { 
    .nav-wrap {
        width: 100%;
    }
}

@media only screen and (max-width: 24rem) { 
    .nav-wrap {
        width: 100%;
    }
    .nav-link.nav-link-space,
    .nav-link.nav-link-membership,
    .nav-link.nav-link-location,
    .nav-link.nav-link-apply {
        width: 100%;
    }
}

.nav-link {
  font-family: 'Aeonik', sans-serif;
  font-size: 1.25em;
  line-height: 1em;
  margin: 0;
  font-weight: 400;
  text-decoration: none;
  box-shadow: 0 0 0 1px inset var(--nav-link-border);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75em;
  background-color: var(--nav-link-bg);
  color: var(--nav-link-text);
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s, width 0.4s, margin-left 0.4s, margin-right 0.4s, padding 0.2s;
  width: fit-content;
  gap: 1em;
  flex-wrap: nowrap;
  flex-shrink: 0;
  height: var(--nav-link-height);
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

/* Hover state */
.nav-wrap:has(.nav-link:hover) .nav-link, .nav-wrap:hover .nav-link {
  width: 100%;
}

.nav-link:hover {
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