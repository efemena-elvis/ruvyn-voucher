<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

 
    <main v-if="voucherData">
      <ProductDetailsLayout
        :id="voucherData.ID"
        :brand-name="voucherData.name"
        :brand-logo="`https://logo.clearbit.com/${getDomain(voucherData.name)}`"
        :voucher-title="voucherData.description"
        :image-url="voucherData.image_url"
        :description="`This digital voucher provides a prepaid balance that can be used for ${
          voucherData.title ?? voucherData.name
        } services. Perfect for personal use or as a convenient reward.`"
        :price-options="voucherData.denominations"
        :allows-custom-amount="voucherData.is_custom_allowed"
        terms="Vouchers are non-refundable and subject to the merchant's terms and conditions."
        cta-text="Proceed to Checkout"
        @checkout="handlePurchase"
      />
    </main>


    <div v-else class="text-center py-24">
      <h1 class="text-2xl font-bold">Voucher Not Found</h1>
      <p class="text-text-secondary mt-2">
        The voucher you are looking for does not exist.
      </p>
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
import { navigation, footer } from '@/data/layoutData'
import NavigationBar from '@/components/NavigationBar.vue'
import ProductDetailsLayout from '@/components/ProductDetailsLayout.vue'
import Footer from '@/components/Footer.vue'
import { useVouchersStore } from '@/stores/vouchers'


interface Voucher {
  ID: number
  name: string
  title?: string | null
  description: string
  image_url: string
  denominations: number[]  
  is_custom_allowed: boolean
  url?: string         
  brandImage?: string       
  brand?: {
    name: string
    [key: string]: any
  }
  category?: {
    name: string
    [key: string]: any
  }
}
const route = useRoute()
const router = useRouter()
const voucherStore = useVouchersStore()

const voucherData: Ref<Voucher | undefined> = ref()

// Fetch a single voucher by ID
const fetchSingleVoucher = async (id: number | string) => {
  try {
    const response = await voucherStore.getSingleVoucher(id)
    if (response.status === 200) {
      voucherData.value = response.data
    }
  } catch (error) {
    console.log(error)
  }
}


onMounted(async () => {
  const voucherId = parseInt(route.params.id as string)
  if (!isNaN(voucherId)) {
    await fetchSingleVoucher(voucherId)
  }

})

const getDomain = (brandTitle: string) => {
  return `${brandTitle.toLowerCase().replace(/\s+/g, '')}.com`
}

// Checkout 
const handlePurchase = (payload: { voucherId: number; amount: number }) => {
  router.push({
    name: 'checkout',
    query: {
      voucherId: payload.voucherId,
      amount: payload.amount,
    },
  })
}
</script>
