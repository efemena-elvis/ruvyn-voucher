<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="userActions"
    />
    <main class="container px-6 py-20 mx-auto">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-text-primary">Browse by Category</h1>
        <p class="mt-4 text-lg text-text-secondary">
          Find the perfect voucher by exploring our curated categories.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-6 mt-12 md:grid-cols-3 lg:grid-cols-4">
        <RouterLink
          v-for="category in categoryList"
          :key="category.slug"
          :to="{ name: 'home', query: { category: category.slug } }"
          class="group block aspect-square p-6 rounded-xl text-white transition-all duration-300 hover:scale-105 bg-[#c2410c]"
          
        >
          <div class="flex flex-col h-full">
            <h3 class="text-2xl font-bold">{{ category.slug }}</h3>
            <p class="mt-auto text-sm opacity-80 group-hover:opacity-100">
              {{ category.count }} Vouchers
            </p>
          </div>
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
import { computed, onMounted, ref } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'


import { useVouchersStore } from '@/stores/vouchers'


const vouchersStore = useVouchersStore()

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

  const rawCategories = ref<any>([])

const authToken = localStorage.getItem("auth_token")

const userActions = computed(() => {
  return authToken
    ? [{ text: "View Dashboard", url: "/dashboard" }]
    : navigation.userActions
})

const slugify = (text: string) => {
  const normalized = text.toLowerCase().trim()

  if (
    normalized === 'utilities & bills'
  ) {
    return 'utility-bills'
  }

  return normalized
    .replace(/&/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}



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

const fetchCategoriesList = async () => {
  try {
    const response = await vouchersStore.getAllCategories()
    if (response.status === 200) {
      rawCategories.value = response.data
    }
  } catch (error) {
    console.log(error)
  }
}





const categoryList = computed(() => {
  return rawCategories.value.map((category: any) => {
    const count = allVouchers.value.filter(
      (v) => v.category.name === category.name
    ).length

    return {
      ...category,
      slug: slugify(category.name),
      count,
    }
  })
})

onMounted(async () => {
 await fetchVouchersList()
 await fetchCategoriesList()
 
console.log(categoryList)

})




</script>
