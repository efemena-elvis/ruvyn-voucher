<template>
  <footer class="bg-neutral-800 text-text-on-primary">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Info Column -->
        <div class="col-span-1 md:col-span-1">
          <h3 class="text-2xl font-bold">VoucherHub</h3>
          <p class="mt-2 text-neutral-300 text-sm">
            Your one-stop marketplace for digital Voucher cards in South Africa.
          </p>
        </div>

        <!-- Link Columns -->
        <div v-for="column in linkColumns" :key="column.title" class="col-span-1">
          <h4 class="font-semibold tracking-wider uppercase">{{ column.title }}</h4>
          <ul class="mt-4 space-y-2">
            <li v-for="link in column.links" :key="link.text">
              <RouterLink
                :to="link.url"
                class="text-neutral-300 hover:text-white transition-colors text-sm"
              >
                {{ link.text }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-12 pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center"
      >
        <p class="text-sm text-neutral-400">{{ copyrightText }}</p>
        <div class="flex mt-4 md:mt-0 space-x-6">
          <a
            v-for="social in socialLinks"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            class="text-neutral-400 hover:text-white transition-colors"
          >
            <!-- In a real app, these would be SVG icons -->
            <span>{{ social.platform }}</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

// --- TYPE DEFINITIONS ---
interface FooterLink {
  text: string
  url: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  platform: string
  url: string
}

// --- PROPS ---
defineProps<{
  linkColumns: FooterColumn[]
  socialLinks: SocialLink[]
  copyrightText: string
}>()
</script>
