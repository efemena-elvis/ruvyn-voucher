<template>
  <div class="min-h-screen bg-background-subtle flex items-center justify-center p-4">
    <AuthenticationForm
      form-title="Create Your Account"
      form-subtitle="Join to start buying and managing your gift cards."
      :fields="registerFields"
      submit-button-text="Create Account"
      :secondary-link="secondaryLink"
      @submit="handleRegister"
      :isLoading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import AuthenticationForm from '@/components/AuthenticationForm.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'

const authStore = useAuthStore()

const isLoading = ref(false)


const registerFields = [
  {
    name: 'full_name',
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

const router = useRouter()

const handleRegister = async (formData: Record<string, string>) => {
  try {
        isLoading.value = true
    const response = await authStore.registerUser(formData)

    if (response.status === 201) {
      toast.success('Registration successful!', {
        autoClose: 3000,
        onClose: () => {
          router.push('/signin')
        },
        position: toast.POSITION.TOP_RIGHT,
      })
    } else {
      toast.error(response.data.error || 'Registration failed', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  } catch (err: any) {
    toast.error(err.error || 'Something went wrong', {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
    })
  }
  finally {
        isLoading.value = false
    }
}
</script>
