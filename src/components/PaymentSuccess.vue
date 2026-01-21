<template>
  <div class="flex items-center justify-center min-h-screen p-4 bg-background-subtle">
    <StatusDisplay
      status="success"
      :transaction_ref="transaction_ref"
      title="Payment Successful!"
      message="Your voucher has been processed and delivered to your account. You can view and redeem it at any time from your dashboard."
    >
      <template #actions>
        <div class="flex flex-col gap-4 sm:flex-row">
          <RouterLink
            to="/dashboard"
            class="w-full px-8 py-3 text-base font-semibold transition-colors rounded-lg shadow-sm sm:w-auto bg-primary-600 text-text-on-primary hover:bg-primary-700"
          >
            View My Vouchers
          </RouterLink>
          <RouterLink
            to="/"
            class="w-full px-8 py-3 text-base font-semibold transition-colors rounded-lg sm:w-auto bg-neutral-200 text-text-primary hover:bg-neutral-300"
          >
            Continue Shopping
          </RouterLink>
        </div>
      </template>
    </StatusDisplay>
  </div>
</template>

<script setup lang="ts">
import StatusDisplay from '@/components/StatusDisplay.vue'
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router'

onMounted(() => {
  localStorage.removeItem('voucher_amount');
  localStorage.removeItem('voucher_id');
});

const props = defineProps<{
  transaction_ref: string | null
}>()
</script>
