<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <main>
      <!-- The ProductDetailsLayout is configured with mock data for a specific voucher -->
      <ProductDetailsLayout
        :brand-name="voucherData.brandName"
        :voucher-title="voucherData.voucherTitle"
        :image-url="voucherData.imageUrl"
        :description="voucherData.description"
        :price-options="voucherData.priceOptions"
        :terms="voucherData.terms"
        :cta-text="voucherData.ctaText"
        @cta-click="handlePurchase"
      />
    </main>

    <Footer
      :link-columns="footer.linkColumns"
      :social-links="footer.socialLinks"
      :copyright-text="footer.copyrightText"
    />
  </div>
</template>

<script setup lang="ts">
// --- 1. IMPORT COMPONENTS & UTILS ---
import NavigationBar from '@/components/NavigationBar.vue'
import ProductDetailsLayout from '@/components/ProductDetailsLayout.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData' // Centralized layout data
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

// --- 2. DEFINE PAGE-SPECIFIC DATA ---
// Mock data for the voucher. In a real app, this would be fetched from an API.
const voucherData = ref({
  brandName: 'Spotify Premium',
  voucherTitle: '1-Month Subscription',
  imageUrl: 'https://placehold.co/600x400/1DB954/fff?text=Spotify',
  description:
    'Enjoy ad-free music, offline listening, and more with a 1-month Spotify Premium subscription. Perfect for music lovers of all genres.',
  priceOptions: [1000, 2500, 5000],
  terms:
    'This voucher is redeemable for a 1-month subscription in Nigeria only. See full terms at spotify.com.',
  ctaText: 'Proceed to Checkout',
})

// --- 3. LOGIC ---
const route = useRoute()
const router = useRouter()

onMounted(() => {
  // This demonstrates how you would use the route parameter to fetch specific data.
  const voucherId = route.params.id
  console.log(`Fetching data for voucher ID: ${voucherId}`)
  // --- API call would go here, e.g., fetchVoucherById(voucherId).then(data => voucherData.value = data) ---
})

// This handler is triggered by the 'ctaClick' event from the child component.
const handlePurchase = () => {
  console.log('Proceeding to checkout...')
  // Navigate to the checkout page.
  router.push('/checkout')
}
</script>
