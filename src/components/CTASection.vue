<template>
  <section class="bg-background-subtle">
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="item in ctaItems"
          :key="item.headline"
          class="bg-white p-8 rounded-xl shadow-md flex items-center gap-x-6"
        >
          <!-- Icon would go here -->
          <div>
            <h3 class="font-bold text-lg text-text-primary">{{ item.headline }}</h3>
            <RouterLink
              :to="item.url"
              class="mt-2 inline-block font-semibold text-primary-600 hover:underline"
            >
              {{ item.ctaText }} &rarr;
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface CtaItem {
  headline: string
  ctaText: string
  url: string
}

defineProps<{
  ctaItems: CtaItem[]
}>()
</script>
