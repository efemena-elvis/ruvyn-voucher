<template>
  <div class="flex flex-col h-screen bg-background-subtle">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <!-- Main Content Area (Layout remains the same) -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Column: Sidebar (Fixed) -->
      <aside class="w-1/3 p-8 bg-white overflow-y-auto hidden lg:block">
        <VoucherSidebar />
      </aside>

      <!-- Right Column: Form (Scrollable) -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-3xl mx-auto py-16 px-8">
          <div class="bg-white p-8 rounded-xl shadow-md">
            <h2 class="text-2xl font-bold text-text-primary">Enter Voucher Details</h2>
            <p class="mt-2 text-sm text-text-secondary">
              Provide the information below to check the status and balance of your voucher.
            </p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="brand" class="block text-sm font-medium text-text-primary">Brand</label>
                <select
                  id="brand"
                  name="brand"
                  class="mt-1 block w-full py-2.5 px-3 border border-neutral-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option disabled selected>Select a brand</option>
                  <option v-for="brand in uniqueBrands" :key="brand.id">{{ brand.title }}</option>
                </select>
              </div>

              <div>
                <label for="voucherCode" class="block text-sm font-medium text-text-primary"
                  >Voucher Code</label
                >
                <input
                  type="text"
                  name="voucherCode"
                  id="voucherCode"
                  placeholder="Enter the code from your voucher"
                  class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md py-2.5 px-3"
                />
              </div>

              <div>
                <label for="pin" class="block text-sm font-medium text-text-primary"
                  >PIN (if applicable)</label
                >
                <input
                  type="text"
                  name="pin"
                  id="pin"
                  placeholder="Enter the PIN if one was provided"
                  class="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md py-2.5 px-3"
                />
              </div>
            </div>
          </div>

          <button
            @click="handleVerification"
            type="button"
            class="w-full mt-6 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Verify Voucher
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue' // <-- Import NavigationBar
import LogoIcon from '@/components/LogoIcon.vue'
import VoucherSidebar from '@/components/VoucherSidebar.vue'
import { navigation } from '@/data/layoutData' // <-- Import navigation data
import { allVouchers } from '@/data/voucherData' // <-- Import voucher data for brands

// This component is no longer needed
// import AccordionWrapper from '@/components/AccordionWrapper.vue';

const router = useRouter()

// This logic ensures we only display each brand once in the dropdown
const uniqueBrands = [...new Map(allVouchers.map((v) => [v.title, v])).values()]

const handleVerification = () => {
  console.log('Verifying voucher...')
  router.push('/verify-voucher/success')
}
</script>
