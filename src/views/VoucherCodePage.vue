<template>
  <Loader v-if="isLoading" class="py-30" size="w-12 h-12" />
  <!-- Main Content -->

  <main class="flex-1 p-8 bg-none" v-else>
    <div class="max-w-lg p-6 mx-auto shadow rounded-2xl">
      <h1 class="px-6 pb-4 mb-6 -mx-6 text-2xl font-bold text-gray-800 border-b border-gray-200">
        Voucher Details
      </h1>

      <div class="mb-4">
        <p class="text-gray-600">Voucher Name</p>
        <p class="text-lg font-semibold">{{ voucher?.voucher.name }}</p>
      </div>

      <div class="mb-4">
        <p class="text-gray-600">Voucher Type</p>
        <p class="text-lg font-semibold">{{ formatType(voucher?.voucher.type) }}</p>
      </div>
      <div class="mb-4">
        <p class="text-gray-600">Amount</p>
        <p class="text-lg font-semibold">TZS {{ voucher?.amount }}</p>
      </div>
      <div class="mb-4">
        <p class="text-gray-600">Expiry Date</p>
        <p v-if="voucher" class="text-lg font-semibold">
          {{ new Date(voucher?.expires_at).toLocaleDateString('en-GB') }}
        </p>
      </div>
      <div class="mb-4" v-if="voucher?.redeemed_at">
        <p class="text-gray-600">Date Redeemed</p>
        <p v-if="voucher" class="text-lg font-semibold">
          {{ new Date(voucher?.redeemed_at).toLocaleDateString('en-GB') }}
        </p>
      </div>
      <div class="mb-6">
        <p class="text-gray-600">Your Code</p>
        <div class="flex flex-col items-start justify-between gap-4 p-3 bg-gray-100 rounded-lg lg:items-center lg:gap-0 lg:flex-row">
          <span class="font-mono font-bold text-md text-primary-600">
            {{ voucher?.code }}
          </span>
          <button
            @click="copyCode"
            class="px-3 py-2 text-sm text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
          >
            Copy
          </button>
        </div>
      </div>

      <button
        class="w-full py-2 font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600"
        @click="goBack"
      >
        Back to My Vouchers
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useVouchersStore } from '../stores/vouchers'
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import Loader from '@/components/Loader.vue'

type VoucherType = {
  voucher: any
  expiresAt: string
  code: string
  [key: string]: string
}

const router = useRouter()
const route = useRoute()
const vouchersStore = useVouchersStore()

const purchasedVouchers = ref<VoucherType[]>([])
const isLoading = ref(true)

const formatType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

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

const voucher = computed<VoucherType | undefined>(() =>
  purchasedVouchers.value.find((v) => String(v.ID) === String(route.params.id)),
)

onMounted(async () => {
  await fetchPurchasedVouchers()
})

const copyCode = () => {
  navigator.clipboard.writeText(String(voucher.value?.code))
  toast.success('Voucher code copied', {
    autoClose: 3000,
  })
}

const goBack = () => {
  router.push('/dashboard')
}
</script>
