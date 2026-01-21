<template>
  <DashboardLayout :sidebar-links="dashboardLinks" active-view-title="My Vouchers">
 <Loader v-if="isLoading" class="py-30" size="w-12 h-12" />

    <div class="space-y-4" v-else>
    

      <div
        v-for="voucher in purchasedVouchers"
        :key="voucher.id"
        class="flex flex-row items-start justify-between p-4 border rounded-lg border-neutral-200"
      >
        <div>
          <p class="font-bold text-text-primary">{{ voucher.voucher.brand.name }}</p>
          <p class="text-sm text-text-secondary">Expires: {{ new Date(voucher?.expires_at).toLocaleDateString("en-GB" ) }}</p>
        </div>
        <RouterLink :to="`/voucher/${voucher.code}`" class="mt-4 sm:mt-0">
          <button
            class="px-4 py-2 text-sm font-semibold rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200"
          >
            View Code
          </button>
        </RouterLink>
      </div>
      <div v-if="purchasedVouchers?.length === 0" class="py-10 text-center">
        <p class="text-text-secondary">You haven't purchased any vouchers yet.</p>
        <RouterLink to="/" class="font-semibold text-primary-600 hover:underline">
          Start Shopping
        </RouterLink>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/components/DashboardLayout.vue'
import { RouterLink } from 'vue-router'
import { useVouchersStore } from '../stores/vouchers'
import { onMounted, ref } from 'vue'
import Loader from '@/components/Loader.vue'


type VoucherType = {
  voucher: any;
  expiresAt: string
  status: string
  [key: string]: string
}

const vouchersStore = useVouchersStore()

const purchasedVouchers = ref<VoucherType[]>([])
const isLoading = ref(true)

const fetchPurchasedVouchers = async () => {
  isLoading.value = true
  try {
    const response = await vouchersStore.getVouchersByUser()

    if (response.status === 200) {
      purchasedVouchers.value = response.data.vouchers
    }
  } catch (error) {
    console.log(error)
  }

  isLoading.value = false
}

const dashboardLinks = [
  { name: 'dashboard', text: 'My Vouchers', url: '/dashboard' },
  { name: 'profile', text: 'Profile Settings', url: '#' },
  { name: 'history', text: 'Purchase History', url: '#' },
]

onMounted(() => {
  fetchPurchasedVouchers()
})



</script>
