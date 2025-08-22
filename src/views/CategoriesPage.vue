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
          v-for="category in categoryList"
          :key="category.slug"
          :to="{ name: 'home', query: { category: category.slug } }"
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
import { categories, getSlugsForParentCategory } from '@/data/categoryData'

// This logic dynamically generates the category list with counts
const categoryList = categories.map((category) => {
  const relevantSlugs = getSlugsForParentCategory(category.slug)
  const count = allVouchers.filter((v) => relevantSlugs.includes(v.categorySlug)).length
  return {
    ...category,
    count,
  }
})
</script>
