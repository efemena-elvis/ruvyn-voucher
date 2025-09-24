<template>
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-extrabold text-text-primary">{{ formTitle }}</h2>
      <p class="mt-2 text-text-secondary">{{ formSubtitle }}</p>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="bg-background-default shadow-lg rounded-xl p-8 space-y-6"
    >
      <div v-for="field in fields" :key="field.name" class="relative">
        <label
          :for="field.name"
          class="block text-sm font-semibold text-text-primary mb-1"
        >
          {{ field.label }}
        </label>

        <input
          :id="field.name"
          :name="field.name"
          :type="field.type === 'password' && showPassword ? 'text' : field.type"
          :placeholder="field.placeholder"
          v-model="formData[field.name]"
          class="block w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition pr-12"
          required
        />

        <button
          v-if="field.type === 'password'"
          type="button"
          class="absolute inset-y-0 right-3 top-6 flex items-center text-sm text-primary-600"
          @click="togglePassword"
        >
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full py-3 text-base font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span v-if="!isLoading">{{ submitButtonText }}</span>
        <span v-else class="flex items-center gap-2">
          <svg
            class="animate-spin h-5 w-5 text-white"
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
        </span>
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-text-secondary">
      {{ secondaryLink.text }}
      <RouterLink
        :to="secondaryLink.url"
        class="font-semibold text-primary-600 hover:underline"
      >
        {{ secondaryLink.ctaText }}
      </RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { RouterLink } from 'vue-router'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password'
  placeholder?: string
}

interface SecondaryLink {
  text: string
  url: string
  ctaText: string
}

type FormData = {
  [key: string]: string
}

const props = defineProps<{
  formTitle: string
  formSubtitle: string
  fields: FormField[]
  submitButtonText: string
  secondaryLink: SecondaryLink
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', formData: FormData, done: () => void): void
}>()

const formData = ref<FormData>({})
const showPassword = ref(false)

props.fields.forEach((field) => {
  formData.value[field.name] = ''
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = () => {
  emit('submit', formData.value, () => {
    Object.keys(formData.value).forEach((key) => {
      formData.value[key] = ''
    })
  })
}
</script>
