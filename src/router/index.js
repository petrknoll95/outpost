import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SpacePage from '../pages/SpacePage.vue'
import MembershipPage from '../pages/MembershipPage.vue'
import ApplyPage from '../pages/ApplyPage.vue'
import LocationPage from '../pages/LocationPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { 
      isHomePage: true,
      title: 'OUTPOST - A workspace for people who actually work',
      description: 'Small. Quiet. Built for people who actually work. 16 fixed desks. No hot desk circus. No desk thieves.',
      keywords: 'coworking space, workspace, fixed desks, quiet workspace, productivity',
      ogImage: '/images/opengraph.jpg',
      ogTitle: 'OUTPOST - A workspace for people who actually work',
      ogDescription: 'Small. Quiet. Built for people who actually work.'
    }
  },
  {
    path: '/space',
    name: 'Space',
    component: SpacePage,
    meta: {
      title: 'Our Space | OUTPOST',
      description: 'Designed for builders, thinkers, and people who show up. Explore our comfortable workspace designed for focused productivity.',
      keywords: 'coworking space, workspace design, quiet workspace, productivity space',
      ogImage: '/images/opengraph.jpg',
      ogTitle: 'Our Space | OUTPOST',
      ogDescription: 'Designed for builders, thinkers, and people who show up.'
    }
  },
  {
    path: '/membership',
    name: 'Membership',
    component: MembershipPage,
    meta: {
      title: 'Membership | OUTPOST',
      description: "You bring the hustle. We'll bring the power outlets. Become a member of our focused coworking space.",
      keywords: 'coworking membership, workspace plans, fixed desk membership',
      ogImage: '/images/opengraph.jpg',
      ogTitle: 'Membership | OUTPOST',
      ogDescription: "You bring the hustle. We'll bring the power outlets."
    }
  },
  {
    path: '/apply',
    name: 'Apply',
    component: ApplyPage,
    meta: {
      title: 'Apply for Membership | OUTPOST',
      description: 'Apply to join our community of focused professionals at OUTPOST coworking space.',
      keywords: 'coworking application, workspace membership, join coworking',
      ogImage: '/images/opengraph.jpg',
      ogTitle: 'Apply for Membership | OUTPOST',
      ogDescription: 'Join our community of focused professionals.'
    }
  },
  {
    path: '/location',
    name: 'Location',
    component: LocationPage,
    meta: {
      title: 'Location | OUTPOST',
      description: 'Find us at our convenient location designed for productivity and focus.',
      keywords: 'coworking location, workspace address, coworking space location',
      ogImage: '/images/opengraph.jpg',
      ogTitle: 'Location | OUTPOST',
      ogDescription: 'Find us at our convenient location designed for productivity and focus.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top when navigating to a new page
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title and meta tags
router.beforeEach((to, from, next) => {
  // Update page title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  
  // Update meta tags
  const metaTags = document.getElementsByTagName('meta')
  
  // Update description
  if (to.meta && to.meta.description) {
    const descriptionTag = Array.from(metaTags).find(tag => tag.name === 'description')
    if (descriptionTag) {
      descriptionTag.content = to.meta.description
    }
  }
  
  // Update keywords
  if (to.meta && to.meta.keywords) {
    const keywordsTag = Array.from(metaTags).find(tag => tag.name === 'keywords')
    if (keywordsTag) {
      keywordsTag.content = to.meta.keywords
    }
  }
  
  // Update Open Graph tags
  if (to.meta && to.meta.ogTitle) {
    const ogTitleTag = Array.from(metaTags).find(tag => tag.getAttribute('property') === 'og:title')
    if (ogTitleTag) {
      ogTitleTag.content = to.meta.ogTitle
    }
  }
  
  if (to.meta && to.meta.ogDescription) {
    const ogDescTag = Array.from(metaTags).find(tag => tag.getAttribute('property') === 'og:description')
    if (ogDescTag) {
      ogDescTag.content = to.meta.ogDescription
    }
  }
  
  // Twitter tags
  if (to.meta && to.meta.ogTitle) {
    const twitterTitleTag = Array.from(metaTags).find(tag => tag.name === 'twitter:title')
    if (twitterTitleTag) {
      twitterTitleTag.content = to.meta.ogTitle
    }
  }
  
  if (to.meta && to.meta.ogDescription) {
    const twitterDescTag = Array.from(metaTags).find(tag => tag.name === 'twitter:description')
    if (twitterDescTag) {
      twitterDescTag.content = to.meta.ogDescription
    }
  }
  
  next()
})

export default router 