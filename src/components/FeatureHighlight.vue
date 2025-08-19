<template>
  <section class="bg-background-default">
    <div class="container mx-auto px-6 py-20">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-text-primary tracking-tight">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="mt-3 max-w-2xl mx-auto text-lg text-text-secondary">
          {{ subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        <div v-for="feature in features" :key="feature.title" class="text-center">
          <!-- Icon -->
          <div
            class="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-primary-100 text-primary-600 mb-5 transform group-hover:scale-110 transition-transform duration-300"
          >
            <!-- Dynamic SVG Icon would go here based on feature.icon -->
            <svg
              class="w-9 h-9"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              v-html="getIconPath(feature.icon)"
            ></svg>
          </div>

          <!-- Text Content -->
          <h3 class="text-xl font-bold text-text-primary">
            {{ feature.title }}
          </h3>
          <p class="mt-2 text-base text-text-secondary">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// --- TYPE DEFINITIONS ---
// Use a literal type for icon names for better type-safety and autocompletion
type IconName = 'users' | 'gift' | 'shopping-cart' | 'briefcase'

interface Feature {
  icon: IconName
  title: string
  description: string
}

// --- PROPS ---
defineProps<{
  title: string
  subtitle?: string
  features: Feature[]
}>()

// --- COMPOSITION API UTILITY ---
// This function maps an icon name to its SVG path data.
// This is a clean way to manage a small, local icon set. For a larger set,
// a dedicated Icon component would be preferable.
const iconPaths: Record<IconName, string> = {
  users:
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>',
  gift: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>',
  'shopping-cart':
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>',
  briefcase:
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>',
}

const getIconPath = (iconName: IconName): string => {
  return iconPaths[iconName] || ''
}
</script>
