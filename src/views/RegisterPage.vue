<template>
  <div class="min-h-screen bg-background-subtle flex items-center justify-center p-4">
    <AuthenticationForm
      form-title="Create Your Account"
      form-subtitle="Join to start buying and managing your gift cards."
      :fields="registerFields"
      submit-button-text="Create Account"
      :secondary-link="secondaryLink"
      @submit="handleRegister"
    />
  </div>
</template>

<script setup lang="ts">
import AuthenticationForm from '@/components/AuthenticationForm.vue'
import { useRouter } from 'vue-router'

// --- DEFINE COMPONENT PROPS ---
const registerFields = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text' as const,
    placeholder: 'John Doe',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email' as const,
    placeholder: 'you@example.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: 'Minimum 8 characters',
  },
]

const secondaryLink = {
  text: 'Already have an account?',
  url: '/signin',
  ctaText: 'Sign In',
}

// --- LOGIC ---
const router = useRouter()

const handleRegister = (formData: Record<string, string>) => {
  console.log('--- Registration Attempt ---')
  console.log(formData)

  // In a real app, you would send this data to your registration API.
  // For the prototype, we'll simulate success and redirect.
  alert(`Simulating registration for: ${formData.email}`)
  router.push('/dashboard') // Redirect to dashboard after successful registration
}
</script>
