<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <main>
      <HeroBanner
        headline="Find the Perfect Gift Card"
        subheadline="Instant delivery. Endless possibilities. The ideal gift is just a search away."
        search-placeholder="Search for brands, gift ideas, or categories..."
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
            @click="activeCategory = category"
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
import { ref, computed } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import CardGrid from '@/components/CardGrid.vue'
import CTASection from '@/components/CTASection.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'

// --- HIGH-FIDELITY MOCK DATA ---
// This data now perfectly matches the new VoucherCard props and the visual design.
const allVouchers = [
  {
    id: 1,
    title: 'Spotify Premium',
    // Simulating the brand image from your design
    brandImage: 'https://placehold.co/400x225/1DB954/FFFFFF?text=Spotify+Premium',
    description: 'Visa Virtual Account',
    url: '/vouchers/1',
    category: 'Most Popular',
  },
  {
    id: 2,
    title: 'SHEIN',
    brandImage: 'https://placehold.co/400x225/000000/FFFFFF?text=SHEIN',
    description: 'Mastercard Gift Card',
    url: '/vouchers/2',
    category: 'Featured',
  },
  {
    id: 3,
    title: 'TEMU',
    brandImage: 'https://placehold.co/400x225/FF7518/FFFFFF?text=TEMU',
    description: 'GiftCards.com Gift',
    url: '/vouchers/3',
    category: 'Featured',
  },
  {
    id: 4,
    title: 'Netflix',
    brandImage: 'https://placehold.co/400x225/E50914/FFFFFF?text=NETFLIX',
    description: 'Target Gift Card',
    url: '/vouchers/4',
    category: 'Just Added',
  },
  // Adding more for a complete look
  {
    id: 5,
    title: 'Amazon',
    brandImage: 'https://placehold.co/400x225/00A2E8/FFFFFF?text=amazon',
    description: 'Vanilla eGift Card',
    url: '/vouchers/5',
    category: 'Most Popular',
  },
  {
    id: 6,
    title: 'Uber',
    brandImage: 'https://placehold.co/400x225/000000/FFFFFF?text=Uber',
    description: 'Ride & Eats eGift',
    url: '/vouchers/6',
    category: 'Travel',
  },
  {
    id: 7,
    title: 'Apple',
    brandImage: 'https://placehold.co/400x225/222222/FFFFFF?text=+Gift+Card',
    description: 'App Store & iTunes',
    url: '/vouchers/7',
    category: 'Featured',
  },
  {
    id: 8,
    title: 'Jumia Food',
    brandImage: 'https://placehold.co/400x225/f68b1e/FFFFFF?text=Jumia+Food',
    description: 'Restaurant Delivery',
    url: '/vouchers/8',
    category: 'Food & Drink',
  },
]

// The filter logic remains the same but now works with the new data structure.
const categories = ['All', 'Most Popular', 'Featured', 'Just Added', 'Food & Drink', 'Travel']
const activeCategory = ref('All')

const filteredVouchers = computed(() => {
  if (activeCategory.value === 'All') {
    return allVouchers
  }
  return allVouchers.filter((v) => v.category === activeCategory.value)
})

// CTA Section data remains the same
const ctaData = [
  {
    headline: 'Schedule a gift to arrive... or send one right now!',
    ctaText: 'Get Started',
    url: '/schedule',
  },
  {
    headline: 'Register to earn Reward Points for buying Gift Cards!',
    ctaText: 'Register Now',
    url: '/register',
  },
]
</script>
