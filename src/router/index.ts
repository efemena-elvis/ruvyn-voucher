import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Note: We renamed HomeView.vue to LandingPage.vue for clarity
      component: () => import('@/views/LandingPage.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SignInPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterPage.vue'),
    },
    {
      path: '/for-business',
      name: 'for-business',
      component: () => import('@/views/ForBusinessPage.vue'),
    },
    {
      // Dynamic route for individual vouchers
      path: '/vouchers/:id',
      name: 'voucher-details',
      component: () => import('@/views/VoucherDetailsPage.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutPage.vue'),
    },
    {
      path: '/payment/success',
      name: 'payment-success',
      component: () => import('@/views/PaymentSuccessPage.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/UserDashboardPage.vue'),
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('@/views/TermsOfServicePage.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/views/PrivacyPolicyPage.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactPage.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoriesPage.vue'),
    },
    {
      path: '/brands',
      name: 'brands',
      component: () => import('@/views/BrandsPage.vue'),
    },
    {
      path: '/dispute',
      name: 'dispute',
      component: () => import('@/views/DisputePage.vue'),
    },
    {
      path: '/dispute/success',
      name: 'dispute-success',
      component: () => import('@/views/DisputeSuccessPage.vue'),
    },
  ],
})

export default router
