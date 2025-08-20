<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <main v-if="voucherData">
      <ProductDetailsLayout
        :id="voucherData.id"
        :brand-name="voucherData.title"
        :voucher-title="voucherData.title"
        :image-url="voucherData.brandImage"
        :description="voucherData.description"
        :price-options="voucherData.priceOptions"
        :allows-custom-amount="voucherData.allowsCustomAmount"
        terms="Terms and conditions apply."
        cta-text="Proceed to Checkout"
        @checkout="handlePurchase"
      />
    </main>
    <div v-else class="text-center py-20">
      <p>Voucher not found.</p>
    </div>

    <Footer
      :link-columns="footer.linkColumns"
      :social-links="footer.socialLinks"
      :copyright-text="footer.copyrightText"
    />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import ProductDetailsLayout from '@/components/ProductDetailsLayout.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData' // Centralized layout data
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, type Ref } from 'vue'
import { findVoucherById, type Voucher } from '@/data/voucherData'

const route = useRoute()
const router = useRouter()

// Mock data for the voucher. In a real app, this would be fetched from an API.
const voucherData: Ref<Voucher | undefined> = ref()

onMounted(() => {
  // Read the ID from the URL, convert it to a number
  const voucherId = parseInt(route.params.id as string)
  if (!isNaN(voucherId)) {
    // Find the voucher data from our central source
    voucherData.value = findVoucherById(voucherId)
  }
})

// This handler is triggered by the 'ctaClick' event from the child component.
const handlePurchase = (payload: { voucherId: number; amount: number }) => {
  console.log('Proceeding to checkout with:', payload)
  // Navigate to the checkout page with the data as query parameters
  router.push({
    name: 'checkout',
    query: {
      voucherId: payload.voucherId,
      amount: payload.amount,
    },
  })
}
</script>
