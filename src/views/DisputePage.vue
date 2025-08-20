<template>
  <div class="flex flex-col h-screen bg-background-subtle">
    <!-- Header (Fixed) -->
    <header class="bg-white shadow-sm flex-shrink-0 z-10">
      <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
        <RouterLink to="/" class="flex items-center gap-x-2 group">
          <LogoIcon />
          <span class="text-2xl font-bold text-primary-600">RUVYN</span>
        </RouterLink>
        <div>
          <RouterLink
            to="/signin"
            class="px-5 py-2.5 text-sm font-semibold rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
          >
            Login
          </RouterLink>
        </div>
      </nav>
    </header>

    <!-- Main Content Area -->
    <div class="flex-1 flex overflow-hidden">
      <aside class="w-1/3 p-10 bg-white overflow-y-auto hidden lg:block">
        <DisputeSidebar />
      </aside>

      <!-- Right Column: Form (Scrollable) -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-3xl mx-auto py-16 px-8">
          <div class="space-y-6">
            <AccordionWrapper title="Please select any of these if it applies to you?" start-open>
              <div class="space-y-4">
                <label
                  v-for="reason in disputeReasons"
                  :key="reason.id"
                  class="flex items-start gap-x-3 text-sm text-neutral-700"
                >
                  <input
                    type="checkbox"
                    :value="reason.text"
                    class="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>{{ reason.text }}</span>
                </label>
              </div>
            </AccordionWrapper>

            <AccordionWrapper title="Details of transaction" start-open>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label for="amount" class="block text-sm font-medium text-text-primary"
                    >Amount debited</label
                  >
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <span class="text-neutral-500 sm:text-sm">ZAR</span>
                    </div>
                    <input
                      type="text"
                      name="amount"
                      id="amount"
                      class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-12 pr-4 sm:text-sm border-neutral-300 rounded-md py-2.5"
                      placeholder="45.50"
                    />
                  </div>
                </div>
                <div>
                  <label for="date" class="block text-sm font-medium text-text-primary"
                    >Date of transaction</label
                  >
                  <input
                    type="date"
                    name="date"
                    id="date"
                    class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-400 rounded-md p-2.5"
                  />
                </div>
                <div>
                  <label for="channel" class="block text-sm font-medium text-text-primary"
                    >Payment channel</label
                  >
                  <select
                    id="channel"
                    name="channel"
                    class="mt-1 block w-full py-2.5 px-3 border border-neutral-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option>Card</option>
                    <option>Bank Transfer</option>
                    <option>Wallet</option>
                  </select>
                </div>
                <div>
                  <label for="merchant" class="block text-sm font-medium text-text-primary"
                    >Merchant Name</label
                  >
                  <input
                    type="text"
                    name="merchant"
                    id="merchant"
                    placeholder="Enter merchant name"
                    class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-400 rounded-md p-2.5"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-text-primary"
                    >Phone number</label
                  >
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter phone number"
                    class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-400 rounded-md p-2.5"
                  />
                </div>
              </div>
            </AccordionWrapper>

            <AccordionWrapper title="Upload transaction receipt">
              <label
                for="file-upload"
                class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
              >
                <div
                  class="flex flex-col items-center justify-center p-6 border-2 border-neutral-300 border-dashed rounded-lg"
                >
                  <svg
                    class="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span class="mt-2 block text-sm font-bold text-gray-900"
                    >Click here to upload</span
                  >
                  <span class="block text-xs text-gray-500"
                    >You can upload a doc or a PDF file</span
                  >
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                </div>
              </label>
            </AccordionWrapper>

            <button
              @click="handleSubmit"
              type="button"
              class="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Submit dispute
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import LogoIcon from '@/components/LogoIcon.vue'
import DisputeSidebar from '@/components/DisputeSidebar.vue'
import AccordionWrapper from '@/components/AccordionWrapper.vue'

const router = useRouter()

const disputeReasons = ref([
  {
    id: 1,
    text: 'Only did one transaction at this merchant, I did not authorize the additional transaction. (Attach proof of the transaction).',
  },
  {
    id: 2,
    text: 'Transaction was declined but the funds were still reserved or deducted from my account (attach a decline slip).',
  },
  {
    id: 3,
    text: 'I returned the goods to the merchant and received a credit voucher, which does not appear on my account.',
  },
  {
    id: 4,
    text: 'I made a hotel/vehicle booking, but cancelled the booking. (Attach proof of the cancellation letter sent to and acknowledged by the merchant).',
  },
  { id: 5, text: 'I never received the merchandise I have been debited for.' },
])

const handleSubmit = () => {
  // Logic to gather form data would go here
  console.log('Dispute form submitted')
  router.push('/dispute/success')
}
</script>
