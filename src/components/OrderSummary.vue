<template>
  <div class="bg-background-default border border-neutral-200 rounded-lg p-6 w-full max-w-lg">
    <h3 class="text-xl font-semibold text-text-primary mb-4">Order Summary</h3>

    <!-- Item List -->
    <div class="space-y-3">
      <div v-for="item in items" :key="item.id" class="flex justify-between items-center text-sm">
        <span class="text-text-secondary">{{ item.name }}</span>
        <span class="font-medium text-text-primary">{{
          formatCurrency(item.price, currency)
        }}</span>
      </div>
    </div>

    <!-- Separator -->
    <hr class="my-4 border-t border-neutral-200" />

    <!-- Totals -->
    <div class="space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-text-secondary">Subtotal</span>
        <span class="text-text-primary">{{ formatCurrency(subtotal, currency) }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-text-secondary">Platform Fee</span>
        <span class="text-text-primary">{{ formatCurrency(fees, currency) }}</span>
      </div>
      <div class="flex justify-between text-lg font-bold text-text-primary mt-2">
        <span>Total</span>
        <span>{{ formatCurrency(total, currency) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// --- TYPE DEFINITIONS ---
interface OrderItem {
  id: string | number
  name: string
  price: number
}

// --- PROPS ---
const props = defineProps<{
  items: OrderItem[]
  subtotal: number
  fees: number
  total: number
  currency?: string // e.g., 'NGN'
}>()

// --- COMPOSITION API UTILITY ---
// A simple formatter to display currency correctly.
// This logic is self-contained within the component.
const formatCurrency = (amount: number, currencyCode: string = 'ZAR') => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>
