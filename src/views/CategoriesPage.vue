<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <main class="container mx-auto px-6 py-20">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-4xl font-extrabold text-text-primary tracking-tight">Browse by Category</h1>
        <p class="mt-4 text-lg text-text-secondary">
          Find the perfect voucher by exploring our curated categories.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RouterLink
          v-for="category in categories"
          :key="category.name"
          :to="{ name: 'home', query: { category: category.name } }"
          class="group block aspect-square p-6 rounded-xl text-white transition-all duration-300 hover:scale-105"
          :style="{ backgroundColor: category.color }"
        >
          <div class="flex flex-col h-full">
            <h3 class="font-bold text-2xl">{{ category.name }}</h3>
            <p class="mt-auto text-sm opacity-80 group-hover:opacity-100">
              {{ category.count }} Vouchers
            </p>
          </div>
        </RouterLink>
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
import { RouterLink } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'
import { allVouchers } from '@/data/voucherData'

// This logic dynamically generates category data from our central voucher source
const categoryColors: Record<string, string> = {
  'Most Popular': '#4f46e5',
  Featured: '#0d9488',
  Entertainment: '#ca8a04',
  'Food & Drink': '#c2410c',
  Travel: '#0e7490',
  'Just Added': '#be185d',
}

const categoryCounts = allVouchers.reduce(
  (acc, voucher) => {
    if (voucher.category) {
      acc[voucher.category] = (acc[voucher.category] || 0) + 1
    }
    return acc
  },
  {} as Record<string, number>,
)

const categories = Object.keys(categoryCounts).map((name) => ({
  name,
  count: categoryCounts[name],
  color: categoryColors[name] || '#64748b',
}))
</script>
