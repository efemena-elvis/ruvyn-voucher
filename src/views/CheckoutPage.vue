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
import { useVouchersStore } from '@/stores/vouchers'
import { usePaymentStore } from '@/stores/payment'
import { toast } from 'vue3-toastify'

const order = ref({
  items: [] as { id: number; name: string; price: number }[],
  subtotal: 0,
  fees: 0,
  total: 0,
})

const router = useRouter()
const route = useRoute()
const vouchersStore = useVouchersStore()
const paymentStore = usePaymentStore()

// Fetch a single voucher by ID
const fetchSingleVoucher = async (id: number | string) => {
  try {
    const response = await vouchersStore.getSingleVoucher(id)
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const voucherId = parseInt(route.query.voucherId as string)
  const amount = parseInt(route.query.amount as string)

  if (!isNaN(voucherId) && !isNaN(amount)) {
    const voucher = await fetchSingleVoucher(voucherId)

    if (voucher) {
      const fees = Math.round(amount * 0.05)
      order.value = {
        items: [{ id: voucher.ID, name: voucher.name, price: amount }],
        subtotal: amount,
        fees: fees,
        total: amount + fees,
      }
    }
  }
})

const proceedToPayment = async () => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    router.push('/signin')
    return
  }

  const response = await paymentStore.proceedToCheckout({
    voucher_id: order.value.items[0].id,
    amount: order.value.total,
  })
  if (response.status === 200) {
    window.location.href = response.data.payment_details.payment_link
    toast.success('Payment initiated successfully', {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,

      onClose: () => {

        // router.push('/payment/success')
      },
    })
  } else {
    toast.error(response.data.error || 'Checkout failed', {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}
</script>
