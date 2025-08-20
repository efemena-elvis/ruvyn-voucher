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
        currency="ZAR"
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import OrderSummary from '@/components/OrderSummary.vue'
import { findVoucherById, type Voucher } from '@/data/voucherData'

// --- DEFINE PAGE-SPECIFIC DATA ---
// Use refs to hold the dynamic order data
const order = ref({
  items: [] as { id: number; name: string; price: number }[],
  subtotal: 0,
  fees: 0,
  total: 0,
})

// --- LOGIC ---
const router = useRouter()
const route = useRoute()

onMounted(() => {
  // Read data from the URL query
  const voucherId = parseInt(route.query.voucherId as string)
  const amount = parseInt(route.query.amount as string)

  if (!isNaN(voucherId) && !isNaN(amount)) {
    const voucher = findVoucherById(voucherId)
    if (voucher) {
      // Build the order summary dynamically
      const fees = Math.round(amount * 0.05) // Calculate a 5% fee
      order.value = {
        items: [{ id: voucher.id, name: voucher.title, price: amount }],
        subtotal: amount,
        fees: fees,
        total: amount + fees,
      }
    }
  }
})

const proceedToPayment = () => {
  console.log('Simulating payment processing...')
  // In a real app, this is where you would integrate with the Paystack SDK.
  // Upon a successful callback from the payment gateway, you would redirect.

  // For the prototype, we navigate directly to the success page.
  router.push('/payment/success')
}
</script>
