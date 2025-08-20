<template>
  <div class="border border-neutral-200 rounded-lg bg-white">
    <button @click="toggle" class="w-full flex justify-between items-center p-4 text-left">
      <span class="font-semibold text-text-primary">{{ title }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-text-secondary transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-show="isOpen" class="p-4 border-t border-neutral-200">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  startOpen?: boolean
}>()

const isOpen = ref(props.startOpen || false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>
