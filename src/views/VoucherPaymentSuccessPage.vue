<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background-subtle"
  >
    <div class="max-w-lg">
      <div
        class="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100"
      >
        <svg
          class="w-12 h-12 text-primary-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h1 class="text-3xl font-extrabold text-text-primary">Payment Verified!</h1>
      <p class="mt-3 text-base text-text-secondary">
        We have successfully located your transaction. Below are the details for your records.
      </p>

      <div class="p-6 mt-8 space-y-4 text-left bg-white border border-gray-200 rounded-lg">
        <h2 class="mb-4 font-semibold text-center text-text-primary">Transaction Status</h2>
        <div class="flex justify-between">
          <span class="text-neutral-600">Reference ID:</span>
          <span class="font-semibold text-text-primary">{{ verificationResult?.ref }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Amount Paid:</span>
          <span class="font-semibold text-text-primary">TZS {{ verificationResult?.amount }}</span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-neutral-600">Status:</span>
        <span
  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
  :class="{
    'bg-green-100 text-green-800': verificationResult?.status === 'completed' || verificationResult?.status === 'paid',
    'bg-red-100 text-red-800': verificationResult?.status === 'failed',
    'bg-yellow-100 text-yellow-800': verificationResult?.status === 'pending',
    'bg-gray-100 text-gray-800': !verificationResult?.status 
  }"
>
  {{ verificationResult?.status }}
</span>

        </div>
      </div>

      <div class="mt-8">
        <RouterLink
          to="/verify-payment"
          class="px-8 py-3 text-base font-semibold text-white transition-colors rounded-lg shadow-sm bg-primary-600 hover:bg-primary-700"
        >
          Verify Another Payment
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router'

import { usePaymentStore } from '@/stores/payment'

const paymentStore = usePaymentStore()
const verificationResult = paymentStore.paymentResponse
</script>
