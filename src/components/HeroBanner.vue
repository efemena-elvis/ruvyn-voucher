<template>
  <section class="bg-primary-700">
    <div class="container mx-auto px-6 py-20 text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold text-text-on-primary tracking-tight">
        {{ headline }}
      </h1>
      <p class="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-100">
        {{ subheadline }}
      </p>

      <!-- New: Prominent Search Bar -->
      <div class="mt-10 max-w-2xl mx-auto">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg
              class="w-5 h-5 text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            class="w-full py-4 pl-14 pr-6 text-base text-text-primary bg-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            @input="handleInput"
            :placeholder="searchPlaceholder"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// --- PROPS ---
defineProps<{
  headline: string
  subheadline: string
  searchPlaceholder: string
}>()

// Define the event this component can emit
const emit = defineEmits<{
  (e: 'update:search', value: string): void
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:search', target.value)
}
</script>
