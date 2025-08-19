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
      <div v-for="field in fields" :key="field.name">
        <label :for="field.name" class="block text-sm font-semibold text-text-primary mb-1">
          {{ field.label }}
        </label>
        <input
          :id="field.name"
          :name="field.name"
          :type="field.type"
          :placeholder="field.placeholder"
          v-model="formData[field.name]"
          class="block w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full py-3 text-base font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        {{ submitButtonText }}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-text-secondary">
      {{ secondaryLink.text }}
      <RouterLink :to="secondaryLink.url" class="font-semibold text-primary-600 hover:underline">
        {{ secondaryLink.ctaText }}
      </RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { RouterLink } from 'vue-router'

// --- TYPE DEFINITIONS ---
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

// A generic type for the form data object
type FormData = {
  [key: string]: string
}

// --- PROPS & EMITS ---
const props = defineProps<{
  formTitle: string
  formSubtitle: string
  fields: FormField[]
  submitButtonText: string
  secondaryLink: SecondaryLink
}>()

const emit = defineEmits<{
  (e: 'submit', formData: FormData): void
}>()

// --- COMPOSITION API: STATE & LOGIC ---
// Use a ref to hold the form's state. It's initialized as an empty object.
const formData = ref<FormData>({})

// Initialize the formData object with keys from the fields prop
// This ensures v-model has a property to bind to for each field.
props.fields.forEach((field) => {
  formData.value[field.name] = ''
})

// The handler function that is called on form submission.
const handleSubmit = () => {
  // Emit the current state of the form to the parent component.
  emit('submit', formData.value)
}
</script>
