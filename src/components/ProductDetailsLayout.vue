<template>
  <section class="bg-background-default">
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
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
          <!-- NEW: Brand Logo & Title Area -->
          <div class="flex items-center gap-x-4">
            <img
              :src="brandLogo"
              :alt="brandName"
              class="h-16 w-16 rounded-full object-contain border border-neutral-200 p-1"
            />
            <div>
              <h2 class="text-lg font-semibold text-text-secondary">{{ brandName }}</h2>
              <h1 class="text-4xl font-extrabold text-text-primary -mt-1">{{ voucherTitle }}</h1>
            </div>
          </div>

          <p class="mt-6 text-lg text-text-secondary leading-relaxed">{{ description }}</p>

          <!-- Price/Amount Selector -->
          <div class="mt-8">
            <label class="block text-sm font-semibold text-text-primary mb-2">Choose Amount</label>
            <div class="flex flex-wrap gap-3 items-center">
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
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">R</span>
                <input
                  type="number"
                  placeholder="Custom"
                  v-model="customAmountValue"
                  @focus="selectCustomAmount"
                  @input="selectCustomAmount"
                  class="w-32 px-6 py-3 pl-7 border-2 rounded-lg transition-colors focus:border-primary-500 focus:outline-none"
                  :class="isCustomAmountActive ? 'border-primary-600' : 'border-neutral-300'"
                />
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="mt-auto pt-8">
            <button
              @click="handleCheckout"
              :disabled="selectedAmount <= 0"
              class="w-full py-4 text-lg font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-neutral-300 disabled:cursor-not-allowed"
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
import { ref, computed } from 'vue'

const props = defineProps<{
  id: number
  brandName: string
  brandLogo: string // <-- NEW PROP
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

const formatCurrency = (amount: number, currencyCode: string = 'ZAR') => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>
