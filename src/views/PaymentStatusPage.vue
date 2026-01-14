<template>
  <div class="flex items-center justify-center min-h-screen p-4 bg-background-subtle">
    <div v-if="loading" class="flex flex-col items-center gap-3">
      <svg
        class="w-10 h-10 animate-spin text-primary-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p class="text-text-secondary">Checking payment status...</p>
    </div>
    <component v-else :is="currentComponent"  :transaction_ref="transaction_ref"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useVouchersStore } from '@/stores/vouchers'
import PaymentSuccess from '@/components/PaymentSuccess.vue'
import PaymentPending from '@/components/PaymentPending.vue'
import PaymentFailed from '@/components/PaymentFailed.vue'
import { toast } from 'vue3-toastify'


const vouchersStore = useVouchersStore()
const status = ref<'paid' | 'pending' | 'failed' >('pending')
const transaction_ref = ref<string>(localStorage.getItem("transaction_ref"))
const loading = ref(true)
const transaction_ref = ref<string | null>(localStorage.getItem('transaction_ref'))

const currentComponent = computed(() => {
  switch (status.value) {
    case 'paid':
      return PaymentSuccess
    case 'failed':
      return PaymentFailed
    default:
      return PaymentPending
  }
})



const handleGetVoucherStatus = async () => {
  try {
   
    if (transaction_ref.value) {
      
      const response = await vouchersStore.getVoucherStatus(transaction_ref.value)
      if (response.status === 200) {
        status.value = response.data.status
        transaction_ref.value = response.data.transaction_ref
      } else {
        toast.error('Failed to verify payment. Please try again later.')
        status.value = 'failed'
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await handleGetVoucherStatus()
})
</script>
