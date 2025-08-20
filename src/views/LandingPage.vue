<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <main>
      <HeroBanner
        headline="Find the Perfect Voucher"
        subheadline="Instant delivery. Endless possibilities. The ideal brand voucher is just a search away."
        search-placeholder="Search for brands, voucher, or categories..."
        @update:search="searchQuery = $event"
      />

      <!-- Voucher Section with Filtering -->
      <div class="container mx-auto px-6 py-20">
        <div class="text-center mb-8">
          <h2 class="text-4xl font-extrabold text-text-primary tracking-tight">
            Vouchers for Everyone
          </h2>
        </div>
        <!-- New: Filter Buttons -->
        <div class="flex justify-center gap-x-2 sm:gap-x-4 mb-10">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="[
              'px-4 sm:px-6 py-2.5 text-sm sm:text-base font-semibold rounded-full transition-colors',
              activeCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200',
            ]"
          >
            {{ category }}
          </button>
        </div>
        <CardGrid :cards="filteredVouchers" />
      </div>

      <!-- New: CTA Section -->
      <CTASection :cta-items="ctaData" />
    </main>

    <Footer
      :link-columns="footer.linkColumns"
      :social-links="footer.socialLinks"
      :copyright-text="footer.copyrightText"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import CardGrid from '@/components/CardGrid.vue'
import CTASection from '@/components/CTASection.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'
import { allVouchers } from '@/data/voucherData'

const route = useRoute()
const router = useRouter()

// The filter logic remains the same but now works with the new data structure.
const categories = ['All', 'Most Popular', 'Featured', 'Just Added', 'Food & Drink', 'Travel']
const activeCategory = ref('All')
const searchQuery = ref('')

// --- LOGIC TO SYNC STATE WITH URL ---

// This watcher is the core of the new logic. It watches the URL's query parameter.
watch(
  () => route.query.category,
  (newCategory) => {
    const categoryStr = Array.isArray(newCategory) ? newCategory[0] : newCategory
    if (categoryStr && categories.includes(categoryStr)) {
      activeCategory.value = categoryStr
    } else {
      activeCategory.value = 'All' // Default to 'All' if the query is invalid or missing
    }
  },
  { immediate: true },
) // 'immediate: true' runs the watcher once on component load

// This function now updates the URL, which triggers the watcher to update the state.
const selectCategory = (category: string) => {
  // Clear search when changing category for a better UX
  searchQuery.value = ''
  router.push({ query: { category: category === 'All' ? undefined : category } })
}

const filteredVouchers = computed(() => {
  let vouchers = allVouchers

  // 1. Filter by category
  if (activeCategory.value !== 'All') {
    vouchers = vouchers.filter((v) => v.category === activeCategory.value)
  }

  // 2. Filter by search query (case-insensitive)
  if (searchQuery.value.trim() !== '') {
    const lowerCaseQuery = searchQuery.value.toLowerCase()
    vouchers = vouchers.filter(
      (v) =>
        v.title.toLowerCase().includes(lowerCaseQuery) ||
        v.description.toLowerCase().includes(lowerCaseQuery),
    )
  }

  return vouchers
})

// CTA Section data remains the same
const ctaData = [
  {
    headline: 'Purchase Vouchers for Business Rewards & Incentives.',
    ctaText: 'Explore Business Solutions',
    url: '/for-business',
  },
  {
    headline: 'Register to Track Your Vouchers & Earn Rewards.',
    ctaText: 'Create Your Account',
    url: '/register',
  },
]
</script>
