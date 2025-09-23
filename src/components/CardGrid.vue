<template>
  <div v-if="cards.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <!-- The template remains the same, but the props being passed are different -->
    <VoucherCard
      v-for="card in cards"
      :key="card.id"
      :title="card.name"
      :brand-image="card.image_url"
      :description="card.description"
      :url="card.url"
      :category="card.category"
      :id="card.id"
    />
  </div>
  <div v-else class="text-center py-10">
    <p class="text-text-secondary">No vouchers available for this category.</p>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import VoucherCard from './VoucherCard.vue'

// --- TYPE DEFINITIONS (UPDATED) ---
// This interface is updated to match the new props of VoucherCard.vue
interface CardData {
  id: string | number
  name: string
  image_url: string
  description: string
  url: string
  category: {
    name: string;
    [key: string]: any
  }
}

// --- PROPS ---
const props = defineProps<{
  cards: CardData[]
}>()

// watch(
//   () => props.cards,
//   (newCards) => {
//     console.log(newCards)
//   },
// )
</script>
