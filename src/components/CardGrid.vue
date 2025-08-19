<template>
  <div v-if="cards.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <!-- The template remains the same, but the props being passed are different -->
    <VoucherCard
      v-for="card in cards"
      :key="card.id"
      :title="card.title"
      :brand-image="card.brandImage"
      :description="card.description"
      :url="card.url"
      :category="card.category"
    />
  </div>
  <div v-else class="text-center py-10">
    <p class="text-text-secondary">No vouchers available for this category.</p>
  </div>
</template>

<script setup lang="ts">
import VoucherCard from './VoucherCard.vue'

// --- TYPE DEFINITIONS (UPDATED) ---
// This interface is updated to match the new props of VoucherCard.vue
interface CardData {
  id: string | number
  title: string
  brandImage: string
  description: string
  url: string
  category?: string
}

// --- PROPS ---
defineProps<{
  cards: CardData[]
}>()
</script>
