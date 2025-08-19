<template>
  <section class="bg-background-default">
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        <!-- Left Column: Image Gallery -->
        <div>
          <img
            :src="imageUrl"
            :alt="voucherTitle"
            class="w-full rounded-xl shadow-lg aspect-video object-cover"
          />
        </div>

        <!-- Right Column: Details & Actions -->
        <div class="flex flex-col">
          <h2 class="text-lg font-semibold text-primary-600">{{ brandName }}</h2>
          <h1 class="text-4xl font-extrabold text-text-primary mt-1">{{ voucherTitle }}</h1>
          <p class="mt-4 text-lg text-text-secondary leading-relaxed">{{ description }}</p>

          <!-- Price/Amount Selector -->
          <div class="mt-8">
            <label class="block text-sm font-semibold text-text-primary mb-2">Choose Amount</label>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="option in priceOptions"
                :key="option"
                @click="selectedAmount = option"
                :class="[
                  'px-6 py-3 rounded-lg font-semibold border-2 transition-colors',
                  selectedAmount === option
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-text-primary border-neutral-300 hover:border-primary-500',
                ]"
              >
                {{ formatCurrency(option) }}
              </button>
            </div>
          </div>

          <!-- Action Button -->
          <div class="mt-auto pt-8">
            <button
              class="w-full py-4 text-lg font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {{ ctaText }}
            </button>
            <p class="mt-4 text-xs text-text-secondary text-center">{{ terms }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// --- TYPE DEFINITIONS ---
// None needed for props, but useful for state
type Amount = number | null

// --- PROPS ---
const props = defineProps<{
  brandName: string
  voucherTitle: string
  imageUrl: string
  description: string
  priceOptions: number[]
  terms: string
  ctaText: string
}>()

// --- COMPOSITION API: STATE ---
// `ref` is used to manage the currently selected price amount.
// It's initialized with the first option available.
const selectedAmount = ref<Amount>(props.priceOptions[0] || null)

// --- COMPOSITION API UTILITY ---
const formatCurrency = (amount: number, currencyCode: string = 'NGN') => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>
