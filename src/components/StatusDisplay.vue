<template>
  <div class="bg-background-default rounded-lg p-8 text-center flex flex-col items-center">
    <!-- Dynamic Icon -->
    <div
      class="w-20 h-20 rounded-full flex items-center justify-center mb-6"
      :class="statusStyles.bgColor"
    >
      <svg
        class="w-12 h-12 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="statusStyles.iconPath"
        ></path>
      </svg>
    </div>

    <!-- Title & Message -->
    <h2 class="text-3xl font-extrabold text-text-primary">{{ title }}</h2>
    <p class="mt-2 text-base text-text-secondary max-w-md">
      {{ message }}
    </p>

    <!-- Slot for actions -->
    <div class="mt-8">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// --- TYPE DEFINITIONS ---
// Use a literal type to restrict the status to valid options
type StatusType = 'success' | 'error' | 'warning'

// --- PROPS ---
const props = defineProps<{
  status: StatusType
  title: string
  message: string
}>()

// --- COMPOSITION API: COMPUTED ---
// This computed property derives the correct styles and icon based on the `status` prop.
// This keeps the template clean and centralizes the display logic.
const statusStyles = computed(() => {
  switch (props.status) {
    case 'error':
      return {
        bgColor: 'bg-red-500', // Would use status.error token if defined
        iconPath: 'M6 18L18 6M6 6l12 12', // X icon
      }
    case 'warning':
      return {
        bgColor: 'bg-yellow-500', // Would use status.warning token
        iconPath:
          'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', // Warning icon
      }
    case 'success':
    default:
      return {
        bgColor: 'bg-green-500', // Would use status.success token
        iconPath: 'M5 13l4 4L19 7', // Checkmark icon
      }
  }
})
</script>
