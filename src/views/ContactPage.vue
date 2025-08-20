<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <main class="container mx-auto px-6 py-20">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-4xl font-extrabold text-text-primary tracking-tight">Contact Us</h1>
        <p class="mt-4 text-lg text-text-secondary">
          Have a question or need assistance? Our team is here to help. Fill out the form below, and
          we'll get back to you as soon as possible.
        </p>
      </div>

      <div class="mt-12 max-w-xl mx-auto">
        <form @submit.prevent="handleSubmit" class="bg-white p-8 rounded-xl shadow-md space-y-6">
          <div>
            <label for="fullName" class="block text-sm font-semibold text-text-primary mb-1"
              >Full Name</label
            >
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your Name"
              required
              class="block w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-semibold text-text-primary mb-1"
              >Email Address</label
            >
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              class="block w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-semibold text-text-primary mb-1"
              >Message</label
            >
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="How can we help you?"
              required
              class="block w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full py-3 text-base font-semibold rounded-lg bg-primary-600 text-text-on-primary hover:bg-primary-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
