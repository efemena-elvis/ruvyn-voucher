<template>
  <div class="min-h-screen bg-background-subtle flex items-center justify-center p-4">
    <div v-if="loading" class="flex flex-col items-center gap-3">
      <svg
        class="animate-spin h-10 w-10 text-primary-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p class="text-text-secondary">Checking payment status...</p>
    </div>

    <component v-else :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useVouchersStore } from '@/stores/vouchers'
import PaymentSuccess from '@/components/PaymentSuccess.vue'
import PaymentPending from '@/components/PaymentPending.vue'
import PaymentFailed from '@/components/PaymentFailed.vue'
import { toast } from 'vue3-toastify'

const route = useRoute()
const vouchersStore = useVouchersStore()
const status = ref<'successful' | 'pending' | 'failed' >('pending')
const loading = ref(true)

const currentComponent = computed(() => {
  switch (status.value) {
    case 'successful':
      return PaymentSuccess
    case 'pending':
      return PaymentPending
    default:
      return PaymentFailed
  }
})

const transaction_ref = localStorage.getItem('transaction_ref')

const handleVerification = async () => {
  try {
   
    if (transaction_ref) {
      
      const response = await vouchersStore.verifyVoucher(transaction_ref)
      if (response.status === 200) {
        status.value = response.data.status
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
  await handleVerification()

  //   const queryStatus = route.query.status as string | undefined
  //   if (queryStatus === 'success' || queryStatus === 'pending' || queryStatus === 'error') {
  //     status.value = queryStatus
  //   } else {
  //     status.value = 'error'
  //   }

  //   loading.value = false
})
</script>
