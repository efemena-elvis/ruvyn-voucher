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
      <h1 class="text-3xl font-extrabold text-text-primary">Voucher Verified!</h1>
      <p class="mt-3 text-base text-text-secondary">
        This voucher is valid and ready to be used. Below are the details associated with your code.
      </p>

      <div class="mt-8 bg-white p-6 rounded-lg border border-gray-200 text-left space-y-4">
        <h2 class="font-semibold text-text-primary text-center mb-4">Voucher Status</h2>
        <div class="flex justify-between">
          <span class="text-neutral-600">Brand:</span>
          <span class="font-semibold text-text-primary">{{ verificationResult.brand }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Current Balance:</span>
          <span class="font-semibold text-text-primary">{{ verificationResult.balance }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-600">Expires On:</span>
          <span class="font-semibold text-text-primary">{{ verificationResult.expiryDate }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-neutral-600">Status:</span>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            Active
          </span>
        </div>
      </div>

      <div class="mt-8">
        <RouterLink
          to="/verify-voucher"
          class="px-8 py-3 text-base font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
        >
          Verify Another Voucher
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Mock data for a successful verification result.
const verificationResult = ref({
  brand: 'Spotify Premium',
  balance: 'ZAR 2500.00',
  expiryDate: '15 Aug, 2026',
})
</script>
