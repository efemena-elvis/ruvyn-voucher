<template>
  <RouterLink
    :to="url"
    class="group block bg-violet-50 rounded-lg overflow-hidden border-2 border-gray-200/70 hover:border-primary-300 transition-all duration-300 shadow-sm hover:shadow-sm hover:scale-105"
  >
    <!-- Top Banner (e.g., 'MOST POPULAR') -->
    <div
      v-if="category"
      class="text-center py-0.5 bg-yellow-300 text-yellow-900 text-xs font-bold uppercase tracking-wider"
    >
      {{ category }}
    </div>

    <!-- Main Content Area -->
    <div class="p-4">
      <!-- Brand Image/Lockup -->
      <div class="aspect-video rounded-md overflow-hidden">
        <img :src="brandImage" :alt="`${title} voucher`" class="w-full h-full object-cover" />
      </div>

      <!-- Voucher Title/Description -->
      <p class="mt-4 text-base text-left text-text-secondary h-10">
        {{ description }}
      </p>

      <!-- Buy Now Button -->
      <div class="mt-2 text-center">
        <span
          class="inline-block px-8 py-3 text-sm font-semibold rounded-full bg-indigo-700 text-white group-hover:bg-indigo-800 transition-colors"
        >
          Buy Now
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

// --- PROPS ---
// The props are now precisely tailored to the visual elements in the image.
defineProps<{
  title: string // The main name for the alt text, e.g., "Spotify Premium"
  brandImage: string // URL to the complete brand visual (logo on colored background)
  description: string // The line of text below the image, e.g., "Visa Virtual Account"
  url: string
  category?: string // The text for the top banner
}>()
</script>
