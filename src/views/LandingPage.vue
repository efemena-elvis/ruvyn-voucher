<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />
    <main>
      <HeroBanner
        headline="The Digital Voucher Marketplace"
        subheadline="Instant delivery. Endless possibilities. The ideal voucher is just a search away."
        search-placeholder="Search for airtime, electricity, Netflix..."
        @update:search="searchQuery = $event"
      />
      <div class="container mx-auto px-6 py-20">
        <div class="text-center mb-8">
          <h2 class="text-4xl font-extrabold text-text-primary tracking-tight">
            Vouchers for Everyone
          </h2>
        </div>
        <div class="flex justify-center flex-wrap gap-2 sm:gap-4 mb-10">
          <button
            v-for="filter in filterButtons"
            :key="filter.slug"
            @click="selectCategory(filter.slug)"
            :class="[
              'px-4 sm:px-6 py-2.5 text-sm sm:text-base font-semibold rounded-full transition-colors',
              activeCategorySlug === filter.slug
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200',
            ]"
          >
            {{ filter.name }}
          </button>
        </div>
        <!-- This now correctly displays the filtered vouchers -->
        <CardGrid :cards="formattedVouchers" />
      </div>
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
import { allVouchers } from '@/data/voucherData'
import { categories, getSlugsForParentCategory } from '@/data/categoryData'
import NavigationBar from '@/components/NavigationBar.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import CardGrid from '@/components/CardGrid.vue'
import CTASection from '@/components/CTASection.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'

const route = useRoute()
const router = useRouter()

// --- STATE FOR FILTERING ---
const activeCategorySlug = ref('all')
const searchQuery = ref('')

// --- DYNAMIC FILTER BUTTONS ---
// The special 'tags' now have dedicated slugs for clarity
const filterButtons = [
  { slug: 'all', name: 'All' },
  { slug: 'most-popular', name: 'Most Popular' },
  { slug: 'featured', name: 'Featured' },
  ...categories.map((c) => ({ slug: c.slug, name: c.name })),
]

// --- LOGIC TO SYNC STATE WITH URL ---
watch(
  () => route.query.category,
  (newCategory) => {
    const categoryStr = Array.isArray(newCategory) ? newCategory[0] : newCategory
    activeCategorySlug.value = categoryStr || 'all'
  },
  { immediate: true },
)

const selectCategory = (slug: string) => {
  searchQuery.value = ''
  router.push({ query: { category: slug === 'all' ? undefined : slug } })
}

// --- COMPUTED FILTERING LOGIC (REVISED) ---
const filteredVouchers = computed(() => {
  let vouchers = allVouchers

  // 1. Filter by category or tag
  if (activeCategorySlug.value !== 'all') {
    // THIS IS THE FIX: Check for the special 'tag' slugs first
    if (activeCategorySlug.value === 'most-popular') {
      vouchers = vouchers.filter((v) => v.tags?.includes('Most Popular'))
    } else if (activeCategorySlug.value === 'featured') {
      vouchers = vouchers.filter((v) => v.tags?.includes('Featured'))
    } else {
      // Otherwise, filter by the categorySlug as before
      const relevantSlugs = getSlugsForParentCategory(activeCategorySlug.value)
      vouchers = vouchers.filter((v) => relevantSlugs.includes(v.categorySlug))
    }
  }

  // 2. Filter by search query
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

// --- DATA FORMATTING FOR CARDGRID ---
// This is necessary because the VoucherCard component props changed
const formattedVouchers = computed(() => {
  return filteredVouchers.value.map((v) => ({
    id: v.id,
    title: v.title,
    brandImage: v.brandImage,
    description: v.description,
    url: v.url,
    category: v.tags?.includes('Most Popular')
      ? 'Most Popular'
      : v.tags?.includes('Featured')
        ? 'Featured'
        : undefined,
  }))
})

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
