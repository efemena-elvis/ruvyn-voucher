<template>
  <DashboardLayout :sidebar-links="dashboardLinks" active-view-title="">
    <!-- Main Content -->
    <main class="flex-1 p-8 bg-none">
      <div class="max-w-lg mx-auto rounded-2xl shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Voucher Details</h1>

        <div class="mb-4">
          <p class="text-gray-600">Voucher Name</p>
          <p class="text-lg font-semibold">{{ voucher?.brand.name }}</p>
        </div>

        <div class="mb-4">
          <p class="text-gray-600">Expiry Date</p>
          <p v-if="voucher" class="text-lg font-semibold">
            {{ new Date(voucher?.ExpiresAt).toLocaleDateString('en-GB') }}
          </p>
        </div>

        <div class="mb-6">
          <p class="text-gray-600">Your Code</p>
          <div class="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <span class="text-xl font-mono font-bold text-primary-600">
              {{ voucher?.Code }}
            </span>
            <button
              @click="copyCode"
              class="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm"
            >
              Copy
            </button>
          </div>
        </div>

        <button
          class="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium"
          @click="goBack"
        >
          Back to My Vouchers
        </button>
      </div>
    </main>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/components/DashboardLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import { useVouchersStore } from '../stores/vouchers'
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'

type VoucherType = {
  brand: any
  ExpiresAt: string
  Code: string
  [key: string]: string
}

const router = useRouter()
const route = useRoute()
const vouchersStore = useVouchersStore()

const purchasedVouchers = ref<VoucherType[]>([])

const dashboardLinks = [
  { name: 'dashboard', text: 'My Vouchers', url: '/dashboard' },

  { name: 'profile', text: 'Profile Settings', url: '#' },
  { name: 'history', text: 'Purchase History', url: '#' },
]

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

const voucher = computed<VoucherType | undefined>(() =>
  purchasedVouchers.value.find((v) => String(v.ID) === String(route.params.id)),
)

onMounted(async () => {
  await fetchPurchasedVouchers()
})

const copyCode = () => {
  navigator.clipboard.writeText(String(voucher.value?.Code))
  toast.success('Voucher code copied', {
    autoClose: 3000,
  })
}

const goBack = () => {
  router.push('/dashboard')
}
</script>
