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
    meta: { isHomePage: true }
  },
  {
    path: '/space',
    name: 'Space',
    component: SpacePage
  },
  {
    path: '/membership',
    name: 'Membership',
    component: MembershipPage
  },
  {
    path: '/apply',
    name: 'Apply',
    component: ApplyPage
  },
  {
    path: '/location',
    name: 'Location',
    component: LocationPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 