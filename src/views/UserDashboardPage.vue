<template>
  <DashboardLayout :sidebar-links="dashboardLinks" active-view-title="My Vouchers">
    <div class="space-y-4">
   
      <div
        v-for="voucher in purchasedVouchers"
        :key="voucher.id"
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-neutral-200 rounded-lg"
      >
        <div>
          <p class="font-bold text-text-primary">{{ voucher.brand.name }}</p>
          <p class="text-sm text-text-secondary">Expires: {{ new Date(voucher?.ExpiresAt).toLocaleDateString("en-GB" ) }}</p>
        </div>
        <RouterLink :to="`/voucher/${voucher.ID}`" class="mt-4 sm:mt-0">
          <button
            class="px-4 py-2 text-sm font-semibold rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200"
          >
            View Code
          </button>
        </RouterLink>
      </div>
      <div v-if="purchasedVouchers?.length === 0" class="text-center py-10">
        <p class="text-text-secondary">You haven't purchased any vouchers yet.</p>
        <RouterLink to="/" class="text-primary-600 font-semibold hover:underline">
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


type VoucherType = {
  brand: any
  expiresAt:string;
  status: string;
  [key: string]: string
}

const vouchersStore = useVouchersStore()

const purchasedVouchers = ref<VoucherType[]>([])

const fetchPurchasedVouchers = async () => {
  try {
    const response = await vouchersStore.getVouchersByUser()

    if (response.status === 200) {
      purchasedVouchers.value = response.data.vouchers
    }
  } catch (error) {
    console.log(error)
  }
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
