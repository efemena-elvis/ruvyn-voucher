<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="userActions"
    />
    <main>
      <HeroBanner
        headline="The Digital Voucher Marketplace"
        subheadline="Instant delivery. Endless possibilities. The ideal voucher is just a search away."
        search-placeholder="Search for airtime, electricity, Netflix..."
        @update:search="searchQuery = $event"
      />
      <div class="container px-6 py-20 mx-auto">
        <div class="mb-8 text-center">
          <h2 class="text-4xl font-extrabold tracking-tight text-text-primary">
            Vouchers for Everyone
          </h2>
        </div>
        <div class="flex flex-wrap justify-center gap-2 mb-10 sm:gap-4">
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
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { allVouchers } from '@/data/voucherData'
import { categories, getSlugsForParentCategory } from '@/data/categoryData'
import NavigationBar from '@/components/NavigationBar.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import CardGrid from '@/components/CardGrid.vue'
import CTASection from '@/components/CTASection.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'
import { useVouchersStore } from '@/stores/vouchers'

const route = useRoute()
const router = useRouter()
const vouchersStore = useVouchersStore()


// --- STATE FOR FILTERING ---
const activeCategorySlug = ref('all')
const searchQuery = ref('')

interface Voucher {
  ID: string | number
  name: string
  image_url: string
  description: string
  url?: string
  category: {
    name: string
    [key: string]: any
  }
  tags?: string[]
}

const allVouchers = ref<Voucher[]>([])

const authToken = localStorage.getItem("auth_token")

const userActions = computed(() => {
  return authToken
    ? [{ text: "View Dashboard", url: "/dashboard" }]
    : navigation.userActions
})

const fetchVouchersList = async () => {
  try {
    const response = await vouchersStore.getVouchersList()
    if (response.status === 200) {
      allVouchers.value = response.data
    } else {
    }
  } catch (error) {
    console.log(error)
  }
}

const filterButtons = [
  { slug: 'all', name: 'All' },

  ...categories.map((c) => ({ slug: c.slug, name: c.name })),
]

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

const filteredVouchers = computed(() => {
  let vouchers = allVouchers.value

  if (activeCategorySlug.value !== 'all') {
  
     if (activeCategorySlug.value === 'utility-bills') {
      vouchers = vouchers.filter((v) => v.category.name?.includes('Utilities & Bills'))
    } else {
      const relevantSlugs = getSlugsForParentCategory(activeCategorySlug.value)
      vouchers = vouchers.filter((v) => relevantSlugs.includes(v.category.name.toLowerCase()))
    }
  }

  if (searchQuery.value.trim() !== '') {
    const lowerCaseQuery = searchQuery.value.toLowerCase()
    vouchers = vouchers.filter(
      (v) =>
        v.name.toLowerCase().includes(lowerCaseQuery) ||
        v.description.toLowerCase().includes(lowerCaseQuery),
    )
  }

  return vouchers
})

const formattedVouchers = computed(() => {
  return filteredVouchers.value.map((v) => ({
    id: v.ID.toString(),
    name: v.name,
    image_url: v.image_url,
    description: v.description,
    url: v.url || '#',
    category: v.category
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

onMounted(async () => {
  await fetchVouchersList()

})
</script>
