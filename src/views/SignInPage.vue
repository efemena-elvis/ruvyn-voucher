<template>
  <div class="min-h-screen bg-background-subtle flex items-center justify-center p-4">
    <AuthenticationForm
      form-title="Welcome Back!"
      form-subtitle="Sign in to access your dashboard and vouchers."
      :fields="signInFields"
      submit-button-text="Sign In"
      :secondary-link="secondaryLink"
      @submit="handleSignIn"
    />
  </div>
</template>

<script setup lang="ts">
import AuthenticationForm from '@/components/AuthenticationForm.vue'
import { useRouter } from 'vue-router'

// --- DEFINE COMPONENT PROPS ---
const signInFields = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email' as const, // Use 'as const' for strict typing
    placeholder: 'you@example.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: '••••••••',
  },
]

const secondaryLink = {
  text: "Don't have an account?",
  url: '/register',
  ctaText: 'Register Now',
}

// --- LOGIC ---
const router = useRouter()

// The handleSignIn function receives the form data emitted from the child component.
const handleSignIn = (formData: Record<string, string>) => {
  console.log('--- Sign In Attempt ---')
  console.log(formData)

  // In a real app, you would:
  // 1. Send formData to your authentication API.
  // 2. On success, store the token and redirect.
  // 3. On failure, display an error message.

  // For the prototype, we'll simulate a successful login and redirect to the dashboard.
  alert(`Simulating login for: ${formData.email}`)
  router.push('/dashboard')
}
</script>
