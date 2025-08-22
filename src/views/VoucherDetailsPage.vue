<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <!-- Only render the layout if we successfully found the voucher data -->
    <main v-if="voucherData">
      <ProductDetailsLayout
        :id="voucherData.id"
        :brand-name="voucherData.title"
        :brand-logo="`https://logo.clearbit.com/${getDomain(voucherData.title)}`"
        :voucher-title="voucherData.description"
        :image-url="voucherData.brandImage"
        :description="`This digital voucher provides a prepaid balance that can be used for ${voucherData.title} services. Perfect for personal use or as a convenient reward.`"
        :price-options="voucherData.priceOptions"
        :allows-custom-amount="voucherData.allowsCustomAmount"
        terms="Vouchers are non-refundable and subject to the merchant's terms and conditions."
        cta-text="Proceed to Checkout"
        @checkout="handlePurchase"
      />
    </main>
    <!-- Show a "not found" message if the voucher ID is invalid -->
    <div v-else class="text-center py-24">
      <h1 class="text-2xl font-bold">Voucher Not Found</h1>
      <p class="text-text-secondary mt-2">The voucher you are looking for does not exist.</p>
      <RouterLink
        to="/"
        class="mt-6 inline-block px-6 py-3 text-base font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
      >
        Back to Home
      </RouterLink>
    </div>

    <Footer
      :link-columns="footer.linkColumns"
      :social-links="footer.socialLinks"
      :copyright-text="footer.copyrightText"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { findVoucherById, type Voucher } from '@/data/voucherData'
import NavigationBar from '@/components/NavigationBar.vue'
import ProductDetailsLayout from '@/components/ProductDetailsLayout.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'

const route = useRoute()
const router = useRouter()

const voucherData: Ref<Voucher | undefined> = ref()

// --- DYNAMIC DATA FETCHING ---
onMounted(() => {
  const voucherId = parseInt(route.params.id as string)
  if (!isNaN(voucherId)) {
    voucherData.value = findVoucherById(voucherId)
  }
})

// --- HELPER FUNCTION FOR LOGOS ---
// A simple helper to guess a domain for the Clearbit logo API
const getDomain = (brandTitle: string) => {
  return `${brandTitle.toLowerCase().replace(/\s+/g, '')}.com`
}

// --- NAVIGATION HANDLER ---
const handlePurchase = (payload: { voucherId: number; amount: number }) => {
  console.log('Proceeding to checkout with:', payload)
  router.push({
    name: 'checkout',
    query: {
      voucherId: payload.voucherId,
      amount: payload.amount,
    },
  })
}
</script>
