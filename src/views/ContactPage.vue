<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="userActions"
    />

    <main class="container px-6 py-20 mx-auto">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-text-primary">Contact Us</h1>
        <p class="mt-4 text-lg text-text-secondary">
          Have a question or need assistance? Our team is here to help. Fill out the form below, and
          we'll get back to you as soon as possible.
        </p>
      </div>

      <div class="max-w-xl mx-auto mt-12">
        <form @submit.prevent="handleSubmit" class="p-8 space-y-6 bg-white shadow-md rounded-xl">
          <div>
            <label for="fullName" class="block mb-1 text-sm font-semibold text-text-primary"
              >Full Name</label
            >
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your Name"
              required
              class="block w-full px-4 py-3 transition border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label for="email" class="block mb-1 text-sm font-semibold text-text-primary"
              >Email Address</label
            >
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              class="block w-full px-4 py-3 transition border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label for="message" class="block mb-1 text-sm font-semibold text-text-primary"
              >Message</label
            >
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="How can we help you?"
              required
              class="block w-full px-4 py-3 transition border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full py-3 text-base font-semibold transition-colors rounded-lg shadow-sm bg-primary-600 text-text-on-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>

    <Footer
      :link-columns="footer.linkColumns"
      :social-links="footer.socialLinks"
      :copyright-text="footer.copyrightText"
    />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'
import { computed } from 'vue'


const authToken = localStorage.getItem("auth_token")

const userActions = computed(() => {
  return authToken
    ? [{ text: "View Dashboard", url: "/dashboard" }]
    : navigation.userActions
})


const handleSubmit = (event: Event) => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  console.log('--- Contact Form Submitted ---')
  console.log(data)

  alert('Thank you for your message! We will get back to you shortly.')
  form.reset()
}
</script>
