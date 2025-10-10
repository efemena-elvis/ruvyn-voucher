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

 
    <h2 class="text-3xl font-extrabold text-text-primary">{{ title }}</h2>
    <p class="mt-2 text-base text-text-secondary max-w-md">
      {{ message }}
    </p>
    <div class="mt-4" v-if="status === 'success'" >
      <p class="font-semibold">Transaction Reference:</p>
      <p class="text-primary-600 text-[18px] font-bold">{{ transaction_ref }}</p>
    </div>

    <div class="mt-8">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

type StatusType = 'success' | 'pending' | 'failed'

const props = defineProps<{
  status: StatusType
  title: string
  message: string
  transaction_ref?: string | null
}>()




const statusStyles = computed(() => {
  switch (props.status) {
    case 'failed':
      return {
        bgColor: 'bg-red-500', 
        iconPath: 'M6 18L18 6M6 6l12 12', 
      }
    case 'pending':
      return {
        bgColor: 'bg-yellow-500', 
        iconPath:
          'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', // Warning icon
      }
    case 'success':
    default:
      return {
        bgColor: 'bg-green-500', 
        iconPath: 'M5 13l4 4L19 7', 
      }
  }
})



</script>
