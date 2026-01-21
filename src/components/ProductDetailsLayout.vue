<template>
  <section class="bg-background-default">
    <div class="container px-6 py-16 mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
        <!-- Left Column: Image Gallery -->
        <div>
          <img
            :src="imageUrl"
            :alt="voucherTitle"
            class="object-cover w-full shadow-lg rounded-xl aspect-video"
          />
        </div>

        <!-- Right Column: Details & Actions -->
        <div class="flex flex-col">
          <!-- NEW: Brand Logo & Title Area -->
          <div class="flex items-center gap-x-4">
           
            <div>
              <h1 class="-mt-1 text-4xl font-extrabold text-text-primary">{{ brandName }}</h1>
              <h2 class="text-lg font-semibold text-text-secondary">{{ voucherTitle }}</h2>
              
            </div>
          </div>

          <p class="mt-6 text-lg leading-relaxed text-text-secondary">{{ description }}</p>

          <!-- Price/Amount Selector -->
          <div class="mt-8">
            <label class="block mb-2 text-sm font-semibold text-text-primary">Choose Amount</label>
            <div class="flex flex-wrap items-center gap-3">
              <button
                v-for="option in priceOptions"
                :key="option"
                @click="selectPresetAmount(option)"
                :class="[
                  'px-6 py-3 rounded-lg font-semibold border-2 transition-colors',
                  selectedAmount === option
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-text-primary border-neutral-300 hover:border-primary-500',
                ]"
              >
                {{ formatCurrency(option) }}
              </button>

              <div v-if="allowsCustomAmount" class="relative">
                <span class="absolute -translate-y-1/2 left-3 top-1/2 text-neutral-400">TZS</span>
                <input
                  type="number"
                  placeholder="Custom"
                  v-model="customAmountValue"
                  @focus="selectCustomAmount"
                  @input="selectCustomAmount"
                  class="py-3 pl-10 transition-colors border-2 rounded-lg w-36 focus:border-primary-500 focus:outline-none"
                  :class="isCustomAmountActive ? 'border-primary-600' : 'border-neutral-300'"
                />
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-8 mt-auto">
            <button
              @click="handleCheckout"
              :disabled="selectedAmount <= 0"
              class="w-full py-4 text-lg font-semibold transition-colors rounded-lg shadow-sm bg-primary-600 text-text-on-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-neutral-300 disabled:cursor-not-allowed"
            >
              {{ ctaText }}
            </button>
            <p class="mt-4 text-xs text-center text-text-secondary">{{ terms }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  id: number
  brandName: string
  brandLogo: string 
  voucherTitle: string
  imageUrl: string
  description: string
  priceOptions: number[]
  allowsCustomAmount: boolean
  terms: string
  ctaText: string
}>()

const emit = defineEmits<{
  (e: 'checkout', payload: { voucherId: number; amount: number }): void
}>()

const selectedAmount = ref<number>(props.priceOptions[0] || 0)
const customAmountValue = ref<number | null>(null)

const isCustomAmountActive = computed(
  () => selectedAmount.value === customAmountValue.value && customAmountValue.value !== null,
)

const selectPresetAmount = (amount: number) => {
  selectedAmount.value = amount
  customAmountValue.value = null
}

const selectCustomAmount = () => {
  selectedAmount.value = customAmountValue.value || 0
}

const handleCheckout = () => {
  if (selectedAmount.value > 0) {
    emit('checkout', { voucherId: props.id, amount: selectedAmount.value })
  } else {
    alert('Please select or enter an amount.')
  }
}

const formatCurrency = (amount: number, currencyCode: string = 'TZS') => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>
