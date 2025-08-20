<template>
  <header class="bg-background-default shadow-md w-full relative z-10">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-x-2 group">
        <LogoIcon />
        <span class="text-2xl font-bold text-primary-600 group-hover:opacity-80 transition-opacity">
          {{ logoText }}
        </span>
      </RouterLink>

      <!-- Desktop Navigation Links -->
      <ul class="hidden md:flex items-center gap-x-8">
        <li v-for="link in navLinks" :key="link.text">
          <RouterLink
            :to="link.url"
            class="text-base font-medium text-text-primary hover:text-primary-600 transition-colors"
          >
            {{ link.text }}
          </RouterLink>
        </li>
      </ul>

      <!-- User Actions -->
      <div class="hidden md:flex items-center gap-x-4">
        <RouterLink
          v-for="action in userActions"
          :key="action.text"
          :to="action.url"
          class="px-5 py-2 text-base font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm"
        >
          {{ action.text }}
        </RouterLink>
      </div>

      <!-- Mobile Menu Button (Hamburger) -->
      <div class="md:hidden">
        <button class="text-text-primary focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LogoIcon from './LogoIcon.vue'

// --- TYPE DEFINITIONS ---
// For strong type-safety on our props
interface NavLink {
  text: string
  url: string
}

interface UserAction {
  text: string
  url: string
}

// --- PROPS ---
// Defines the component's public API
defineProps<{
  logoText: string
  navLinks: NavLink[]
  userActions: UserAction[]
}>()
</script>
