<template>
  <div class="flex items-center justify-center min-h-screen p-4 bg-background-subtle">
    <StatusDisplay
      status="failed"
      title="Payment Failed"
      message="Unfortunately, your payment could not be processed. Please try again or use a different payment method."
    >
      <template #actions>
        <div class="flex flex-col gap-4 sm:flex-row">
          <RouterLink
            to="`/checkout?a"
            class="w-full px-8 py-3 text-base font-semibold transition-colors rounded-lg shadow-sm sm:w-auto bg-primary-600 text-text-on-primary hover:bg-primary-700"
          >
           Go to Dashboard
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
import { RouterLink } from 'vue-router'



</script>
