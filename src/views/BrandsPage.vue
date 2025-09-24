<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <main class="container mx-auto px-6 py-20">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-4xl font-extrabold text-text-primary tracking-tight">All Brands</h1>
        <p class="mt-4 text-lg text-text-secondary">
          Explore our full catalog of available brands.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <RouterLink
          v-for="brand in uniqueBrands"
          :key="brand.ID"
          :to="`/vouchers/${brand.ID}`"
          class="group block p-6 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary-500 hover:shadow-md transition-all duration-300"
        >
          <img
            :src="brand.image_url.replace('400x225', '200x125')"
            :alt="`${brand.name} Logo`"
            class="h-16 w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
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
import { onMounted, ref, computed } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'
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
const allVouchers = ref<Voucher[]>([])
const vouchersStore = useVouchersStore()

const fetchVouchersList = async () => {
  try {
    const response = await vouchersStore.getVouchersList()
    if (response.status === 200) {
      allVouchers.value = response.data
    }
  } catch (error) {
    console.log(error)
  }
}


const uniqueBrands = computed(() => {
  return [...new Map(allVouchers.value.map((v: Voucher) => [v.brand?.name, v])).values()]
})

onMounted(async () => {
  await fetchVouchersList()
  console.log(uniqueBrands.value)
})
</script>
