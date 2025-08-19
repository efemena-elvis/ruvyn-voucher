<template>
  <div class="min-h-screen bg-background-subtle flex items-center justify-center p-4">
    <StatusDisplay
      status="success"
      title="Payment Successful!"
      message="Your voucher has been processed and delivered to your account. You can view and redeem it at any time from your dashboard."
    >
      <!-- Content injected into the 'actions' slot of the StatusDisplay component -->
      <template #actions>
        <div class="flex flex-col sm:flex-row gap-4">
          <RouterLink
            to="/dashboard"
            class="w-full sm:w-auto px-8 py-3 text-base font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm"
          >
            View My Vouchers
          </RouterLink>
          <RouterLink
            to="/"
            class="w-full sm:w-auto px-8 py-3 text-base font-semibold rounded-lg bg-neutral-200 text-text-primary hover:bg-neutral-300 transition-colors"
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
import { RouterLink } from 'vue-router'
</script>
