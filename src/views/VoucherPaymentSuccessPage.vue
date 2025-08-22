<template>
  <div
    class="bg-background-subtle min-h-screen flex flex-col items-center justify-center p-4 text-center"
  >
    <div class="max-w-lg">
      <div
        class="mx-auto w-20 h-20 rounded-full flex items-center justify-center bg-primary-100 mb-6"
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

      <div class="mt-8 bg-white p-6 rounded-lg border border-gray-200 text-left space-y-4">
        <h2 class="font-semibold text-text-primary text-center mb-4">Transaction Status</h2>
        <div class="flex justify-between">
          <span class="text-neutral-600">Reference ID:</span>
          <span class="font-semibold text-text-primary">{{ verificationResult.referenceId }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Amount Paid:</span>
          <span class="font-semibold text-text-primary">{{ verificationResult.amount }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Date:</span>
          <span class="font-semibold text-text-primary">{{ verificationResult.date }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-neutral-600">Status:</span>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            Successful
          </span>
        </div>
      </div>

      <div class="mt-8">
        <RouterLink
          to="/verify-payment"
          class="px-8 py-3 text-base font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
        >
          Verify Another Payment
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Mock data for a successful payment verification result.
const verificationResult = ref({
  referenceId: 'RUVN-123XYZ',
  amount: 'ZAR 2500.00',
  date: '18 Aug, 2025',
})
</script>
