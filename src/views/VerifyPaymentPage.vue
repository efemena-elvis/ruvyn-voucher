<template>
  <div class="flex flex-col h-screen bg-background-subtle">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="userActions"
    />

    <div class="flex flex-1 overflow-hidden">
      <aside class="hidden w-1/3 p-8 overflow-y-auto bg-white lg:block">
        <PaymentSidebar />
      </aside>

      <main class="flex-1 overflow-y-auto">
        <div class="max-w-3xl px-8 py-16 mx-auto">
          <div class="p-8 bg-white shadow-md rounded-xl">
            <h2 class="text-2xl font-bold text-text-primary">Enter Payment Details</h2>
            <p class="mt-2 text-sm text-text-secondary">
              Provide the information below to look up your transaction status.
            </p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="voucherToken" class="block text-sm font-medium text-text-primary">
                  Voucher Token
                </label>
                <input
                  v-model="voucherToken"
                  type="text"
                  id="transactionRef"
                  placeholder="Enter voucher token"
                  class="mt-1 focus:ring-primary-500 border border-grey-600 focus:border-primary-500 outline-none block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md p-2.5"
                />
              </div>
            </div>
          </div>

          <button
            @click="handleVerification"
            type="button"
            class="flex items-center justify-center w-full gap-2 py-3 mt-4 text-base font-semibold transition-colors rounded-lg shadow-sm bg-primary-600 text-text-on-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
             <span v-if="!isLoading" >Verify Payment</span>
        <span v-else class="flex items-center gap-2">
          <svg
            class="w-5 h-5 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
       
        </span>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import PaymentSidebar from '@/components/PaymentSidebar.vue'
import { navigation } from '@/data/layoutData'
import { usePaymentStore } from '@/stores/payment'
import { type PaymentResponse } from '@/stores/payment'
import { useVouchersStore } from '@/stores/vouchers'
import { toast } from 'vue3-toastify'

const router = useRouter()
const paymentStore = usePaymentStore()
const vouchersStore = useVouchersStore()

const voucherToken = ref<string>('')
const isLoading = ref<boolean>(false)

const authToken = localStorage.getItem('auth_token')

const userActions = computed(() => {
  return authToken ? [{ text: 'View Dashboard', url: '/dashboard' }] : navigation.userActions
})

const handleVerification = async () => {
  try {
    isLoading.value = true
    const response = await vouchersStore.verifyVoucherByToken({ token: voucherToken.value })

    if (response.status === 200) {
      paymentStore.setPaymentResponse(response.data)

      router.push('/verify-payment/success')
    } else {
      toast.error(response.data.error || 'Something went wrong', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  } catch (error) {
    console.log(error)
  }

  finally {
    isLoading.value = false
  }
}
</script>
