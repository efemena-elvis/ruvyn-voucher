<template>
  <header class="bg-background-default shadow-sm w-full sticky top-0 z-20">
    <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
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

      <!-- Desktop User Actions -->
      <div class="hidden md:flex items-center gap-x-4">
        <RouterLink
          v-for="action in userActions"
          :key="action.text"
          :to="action.url"
          class="px-5 py-2 text-sm font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm"
        >
          {{ action.text }}
        </RouterLink>
      </div>

      <!-- Mobile Menu Button (Hamburger) -->
      <div class="md:hidden">
        <button
          @click="toggleMobileMenu"
          class="text-text-primary focus:outline-none"
          aria-label="Open menu"
        >
          <svg
            class="w-7 h-7"
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

    <!-- Mobile Menu Panel & Overlay -->
    <Transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        @click="toggleMobileMenu"
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
      ></div>
    </Transition>
    <Transition name="slide">
      <div
        v-if="isMobileMenuOpen"
        class="fixed top-0 right-0 w-80 max-w-full h-full bg-white shadow-xl z-40 flex flex-col"
      >
        <div class="flex items-center justify-between p-4 border-b border-neutral-200">
          <span class="font-bold text-primary-600">Menu</span>
          <button @click="toggleMobileMenu" class="focus:outline-none" aria-label="Close menu">
            <svg
              class="w-7 h-7 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex-grow p-4">
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.text">
              <RouterLink
                @click="toggleMobileMenu"
                :to="link.url"
                class="block py-3 px-4 rounded-md text-base font-medium text-text-primary hover:bg-primary-50"
              >
                {{ link.text }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="p-4 border-t border-neutral-200 space-y-3">
          <RouterLink
            v-for="action in userActions"
            :key="action.text"
            @click="toggleMobileMenu"
            :to="action.url"
            class="block w-full text-center px-5 py-3 text-base font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm"
          >
            {{ action.text }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import LogoIcon from './LogoIcon.vue'

// --- PROPS ---
defineProps<{
  logoText: string
  navLinks: { text: string; url: string }[]
  userActions: { text: string; url: string }[]
}>()

// --- STATE FOR MOBILE MENU ---
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// --- SCROLL LOCK ---
// Watch for changes in the menu's state and apply/remove a class to the body
// to prevent the background from scrolling when the menu is open.
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Transitions for the overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transitions for the slide-in panel */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
