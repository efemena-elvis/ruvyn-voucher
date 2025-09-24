<template>
  <div class="min-h-screen bg-background-subtle flex items-center justify-center p-4">
    <AuthenticationForm
      form-title="Welcome Back!"
      form-subtitle="Sign in to access your dashboard and vouchers."
      :fields="signInFields"
      submit-button-text="Sign In"
      :secondary-link="secondaryLink"
      @submit="handleSignIn"
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

const signInFields = [
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
    placeholder: '••••••••',
  },
]

const secondaryLink = {
  text: "Don't have an account?",
  url: '/register',
  ctaText: 'Register Now',
}

const router = useRouter()

const handleSignIn = async (formData: Record<string, string>) => {
  try {
        isLoading.value = true
    const response = await authStore.loginUser(formData);

    if (response.status === 200) {
      toast.success("Login successful!", {
        autoClose: 3000,
          onClose: () => {
    router.push("/dashboard");
  },
        position: toast.POSITION.TOP_RIGHT,
      });


      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("auth_user", JSON.stringify(response.data.user));
    } else {
    
      toast.error(response.data.error || "Login failed", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (err: any) {
   
    toast.error(err.error || "Something went wrong", {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  finally {
        isLoading.value = false
    }
};

</script>
