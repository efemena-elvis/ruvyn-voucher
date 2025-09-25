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
   
      path: '/voucher/:id',
      name: 'voucher-code',
      component: () => import('@/views/VoucherCodePage.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutPage.vue'),
    },
    {
      path: '/payment/callback',
      name: 'payment-status',
       props: route => ({
    status: route.query.status,
    tx_ref: route.query.tx_ref,
    transaction_id: route.query.transaction_id,
  }),
      component: () => import('@/views/PaymentStatusPage.vue'),
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
      path: '/verify-payment',
      name: 'verify-payment',
      component: () => import('@/views/VerifyPaymentPage.vue'),
    },
    {
      path: '/verify-payment/success',
      name: 'verify-payment-success',
      component: () => import('@/views/VoucherPaymentSuccessPage.vue'),
    },
  ],
})

export default router
