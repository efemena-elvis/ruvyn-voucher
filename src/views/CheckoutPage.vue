<template>
  <div class="min-h-screen bg-background-subtle flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-lg">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-extrabold text-text-primary">Confirm Your Order</h1>
        <p class="text-text-secondary mt-2">Review the items below before proceeding to payment.</p>
      </div>

      <!-- The OrderSummary component displays all financial details -->
      <OrderSummary
        :items="order.items"
        :subtotal="order.subtotal"
        :fees="order.fees"
        :total="order.total"
        currency="NGN"
      />

      <!-- Primary Action -->
      <div class="mt-6">
        <button
          @click="proceedToPayment"
          class="w-full py-4 text-lg font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Proceed to Payment
        </button>
        <RouterLink to="/" class="block text-center mt-4 text-sm text-primary-600 hover:underline">
          Continue Shopping
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderSummary from '@/components/OrderSummary.vue'
import { useRouter, RouterLink } from 'vue-router'

// --- DEFINE PAGE-SPECIFIC DATA ---
// Mock data for the current order. In a real app, this would come from a state management store (like Pinia).
const order = {
  items: [{ id: 1, name: 'Spotify Premium - 1 Month', price: 2500 }],
  subtotal: 2500,
  fees: 125,
  total: 2625,
}

// --- LOGIC ---
const router = useRouter()

const proceedToPayment = () => {
  console.log('Simulating payment processing...')
  // In a real app, this is where you would integrate with the Paystack SDK.
  // Upon a successful callback from the payment gateway, you would redirect.

  // For the prototype, we navigate directly to the success page.
  router.push('/payment/success')
}
</script>
