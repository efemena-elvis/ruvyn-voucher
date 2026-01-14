<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="userActions"
    />

    <main class="container px-6 py-20 mx-auto">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-text-primary">All Brands</h1>
        <p class="mt-4 text-lg text-text-secondary">
          Explore our full catalog of available brands.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-12 md:grid-cols-4 lg:grid-cols-6">
        <RouterLink
          v-for="brand in uniqueBrands"
          :key="brand.ID"
          :to="`/vouchers/${brand.ID}`"
          class="block p-6 transition-all duration-300 border rounded-lg group bg-neutral-50 border-neutral-200 hover:border-primary-500 hover:shadow-md"
        >
          <img
            :src="brand.image_url.replace('400x225', '200x125')"
            :alt="`${brand.name} Logo`"
            class="object-contain w-full h-16 transition-transform duration-300 group-hover:scale-110"
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
  // console.log(uniqueBrands.value)
})
</script>
