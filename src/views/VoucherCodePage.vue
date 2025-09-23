<template>
      <DashboardLayout :sidebar-links="dashboardLinks" active-view-title="">

  

    <!-- Main Content -->
    <main class="flex-1 p-8 bg-none">
      <div class="max-w-lg mx-auto rounded-2xl shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          Voucher Details
        </h1>

        <div class="mb-4">
          <p class="text-gray-600">Voucher Name</p>
          <p class="text-lg font-semibold">{{ voucher.brandName }}</p>
        </div>

        <div class="mb-4">
          <p class="text-gray-600">Expiry Date</p>
          <p class="text-lg font-semibold">{{ voucher.expiryDate }}</p>
        </div>

        <div class="mb-6">
          <p class="text-gray-600">Your Code</p>
          <div
            class="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
          >
            <span class="text-xl font-mono font-bold text-primary-600">
              {{ voucher.code }}
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
import DashboardLayout from "@/components/DashboardLayout.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const dashboardLinks = [
  { name: 'dashboard', text: 'My Vouchers', url: '/dashboard' },
 
  { name: 'profile', text: 'Profile Settings', url: '#' },
  { name: 'history', text: 'Purchase History', url: '#' },
]


const voucher = {
  id: route.params.id || "1",
  brandName: "Spotify Premium",
  expiryDate: "15 Aug, 2026",
  code: "SPOT-1234-5678-ABCD",
};

const copyCode = () => {
  navigator.clipboard.writeText(voucher.code);
  alert("Voucher code copied!");
};

const goBack = () => {
  router.push("/dashboard");
};
</script>
