<template>
  <div class="flex items-center justify-center" :class="height">
    <svg
      class="animate-spin"
      :class="[size, color]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'h-5 w-5',
  },
  color: {
    type: String,
    default: 'text-primary-600',
  },
  height: {
    type: String,
    default: 'h-32',
  },
})
</script>
