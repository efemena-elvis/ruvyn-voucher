<template>
  <div class="flex flex-col h-screen bg-background-subtle">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <div class="flex-1 flex overflow-hidden">
      <aside class="w-1/3 p-8 bg-white overflow-y-auto hidden lg:block">
        <PaymentSidebar />
      </aside>

      <main class="flex-1 overflow-y-auto">
        <div class="max-w-3xl mx-auto py-16 px-8">
          <div class="bg-white p-8 rounded-xl shadow-md">
            <h2 class="text-2xl font-bold text-text-primary">Enter Payment Details</h2>
            <p class="mt-2 text-sm text-text-secondary">
              Provide the information below to look up your transaction status.
            </p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="transactionRef" class="block text-sm font-medium text-text-primary">
                  Transaction Reference
                </label>
                <input
                  v-model="transaction_ref"
                  type="text"
                  id="transactionRef"
                  placeholder="e.g., RUVN-123XYZ"
                  class="mt-1 focus:ring-primary-500 border border-grey-600 focus:border-primary-500 outline-none block w-full shadow-sm sm:text-sm border-neutral-300 rounded-md p-2.5"
                />
              </div>
            </div>
          </div>

          <button
            @click="handleVerification"
            type="button"
            class="w-full mt-6 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Verify Payment
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

const transaction_ref = ref<string>('')

const handleVerification = async () => {
  try {
    const response = await vouchersStore.verifyVoucher(transaction_ref.value)

    if (response.status === 200) {
      paymentStore.setPaymentResponse(response.data)

      router.push('/verify-payment/success')
    }

    else{
     toast.error(response.data.error || "Something went wrong", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
