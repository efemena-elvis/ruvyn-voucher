<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-background-subtle">
    <div class="w-full max-w-lg">
      <div class="mb-6 text-center">
        <h1 class="text-3xl font-extrabold text-text-primary">Confirm Your Order</h1>
        <p class="mt-2 text-text-secondary">Review the items below before proceeding to payment.</p>
      </div>

      <!-- The OrderSummary component displays all financial details -->
      <OrderSummary
        :items="order.items"
        :subtotal="order.subtotal"
        :fees="order.fees"
        :total="order.total"
        currency="TZS"
      />

      <!-- Primary Action -->
      <div class="mt-6">
        <button
          @click="proceedToPayment"
          class="w-full py-4 text-lg font-semibold transition-colors rounded-lg shadow-sm bg-primary-600 text-text-on-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Proceed to Payment
        </button>
        <RouterLink to="/" class="block mt-4 text-sm text-center text-primary-600 hover:underline">
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
    localStorage.setItem('voucher_id', voucherId.toString())
    localStorage.setItem('voucher_amount', amount.toString())

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
  try {
    const response = await paymentStore.proceedToCheckout({
      voucher_id: order.value.items[0].id,
      amount: order.value.total,
    })
    if (response.status === 200) {
      localStorage.setItem('transaction_ref', response.data.payment_details.transaction_ref)
      toast.success('Payment initiated successfully', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,

        onClose: () => {
          window.location.href = response.data.payment_details.payment_link
        },
      })
    } else if (response.data.error === 'Invalid or expired token') {
      toast.error('Invalid or expired Token. Please sign in again.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      })
    } else {
      toast.error(response.data.error || 'Checkout failed', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  } catch (error) {}
}
</script>
