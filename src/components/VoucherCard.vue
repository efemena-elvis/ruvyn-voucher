<template>
  <RouterLink
    :to="`vouchers/${id}`"
    class="group block bg-violet-50 rounded-lg overflow-hidden h-auto border-2 border-gray-200/70 hover:border-primary-300 transition-all duration-300 shadow-sm hover:shadow-sm hover:scale-105"
  >
    <!-- Top Banner (e.g., 'MOST POPULAR') -->
    <div
    
      class="text-center py-0.5 bg-yellow-300 text-yellow-900 text-xs font-bold uppercase tracking-wider"
    >
      {{ category.name }}
    </div>

    <!-- Main Content Area -->
    <div class="p-4">
      <!-- Brand Image/Lockup -->
      <div class="aspect-video rounded-md overflow-hidden">
        <img :src="brandImage" :alt="`${title} voucher`" class="w-full h-full object-cover" />
      </div>

      <!-- Voucher Title/Description -->

       <p class="mt-4 text-base text-left text-text-secondary h-10 text-[18px] font-bold">
        {{ title }}
      </p>

      <p class="mt-2 text-base text-left text-text-secondary h-10">
        {{ description }}
      </p>
       

      <!-- Buy Now Button -->
      <div class="mt-5 text-center">
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


defineProps<{
  title: string 
  brandImage: string
  description: string 
  url: string
  id: string | number 
  category: {
    name: string
    [key: string]: any
  }
}>()
</script>
