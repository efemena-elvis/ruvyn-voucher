<template>
  <div class="flex min-h-screen bg-background-subtle">
    <!-- Sidebar Navigation -->
    <aside class="w-64 bg-neutral-800 text-white flex-shrink-0 flex flex-col p-4">
      <div class="text-2xl font-bold text-white mb-8 px-2">VoucherHub</div>
      <nav class="flex-grow">
        <ul>
          <li v-for="link in sidebarLinks" :key="link.name">
            <RouterLink
              :to="link.url"
              class="flex items-center px-3 py-3 my-1 rounded-lg font-medium transition-colors"
              :class="
                isLinkActive(link.name)
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
              "
            >
              <!-- Icon would go here -->
              <span class="ml-3">{{ link.text }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
      <div class="mt-auto">
        <!-- User profile or logout section -->
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 md:p-10">
      <div class="container mx-auto">
        <h1 class="text-3xl font-bold text-text-primary mb-8">{{ activeViewTitle }}</h1>

        <!-- Slot for page-specific content -->
        <div class="bg-background-default p-6 rounded-lg shadow-sm">
          <slot></slot>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

// --- TYPE DEFINITIONS ---
interface SidebarLink {
  name: string // The route name for matching
  text: string
  url: string
}

// --- PROPS ---
defineProps<{
  sidebarLinks: SidebarLink[]
  activeViewTitle: string
}>()

// --- COMPOSITION API: ROUTER AWARENESS ---
// Access the current route to determine which link is active.
const route = useRoute()

const isLinkActive = (routeName: string): boolean => {
  return route.name === routeName
}
</script>
