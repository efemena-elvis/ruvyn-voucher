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
      <h1 class="text-3xl font-extrabold text-text-primary">Dispute Submitted Successfully</h1>
      <p class="mt-3 text-base text-text-secondary">
        Thank you for reaching out. Your dispute has been received and a confirmation has been sent
        to your email.
      </p>

      <div class="mt-8 bg-white p-6 rounded-lg border border-gray-200 text-left">
        <h2 class="font-semibold text-text-primary">What Happens Next?</h2>
        <ul class="mt-4 space-y-3 text-sm text-neutral-600 list-disc list-inside">
          <li>
            A dispute case with reference number
            <span class="font-semibold">#{{ disputeRef }}</span> has been opened.
          </li>
          <li>
            Our support team will review the details and evidence provided within the next 24-48
            hours.
          </li>
          <li>We may contact you via email if additional information is required.</li>
          <li>You will be notified of the resolution as soon as our investigation is complete.</li>
        </ul>
      </div>

      <div class="mt-8">
        <RouterLink
          to="/"
          class="px-8 py-3 text-base font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm"
        >
          Back to Home
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Generate a random-ish reference number for the prototype
const disputeRef = ref(Math.floor(100000 + Math.random() * 900000))
</script>
