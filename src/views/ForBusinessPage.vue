<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />

    <main>
      <HeroBanner
        headline="Power Your Business with Vouchers"
        subheadline="The perfect solution for employee rewards, customer incentives, and reseller opportunities."
        search-placeholder="Search for corporate rewards, bulk orders..."
      />

      <FeatureHighlight
        title="Solutions Tailored For You"
        subtitle="Whether you're rewarding your team or engaging customers, our platform provides a seamless solution."
        :features="businessFeatures"
      />
    </main>

    <Footer
      :link-columns="footer.linkColumns"
      :social-links="footer.socialLinks"
      :copyright-text="footer.copyrightText"
    />
  </div>
</template>

<script setup lang="ts">
// --- 1. IMPORT COMPONENTS ---
import NavigationBar from '@/components/NavigationBar.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import FeatureHighlight from '@/components/FeatureHighlight.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData' // Reusing layout data

// --- 2. DEFINE PAGE-SPECIFIC DATA ---
const businessFeatures = [
  {
    icon: 'users' as const,
    title: 'Corporate Rewards',
    description:
      'Motivate your team and recognize their hard work with gift cards from brands they love.',
  },
  {
    icon: 'gift' as const,
    title: 'Customer Incentives',
    description:
      'Drive loyalty, engagement, and acquisition by offering popular vouchers as rewards.',
  },
  {
    icon: 'shopping-cart' as const,
    title: 'Bulk Purchasing',
    description:
      'Easily buy and distribute hundreds of digital vouchers with our simple, self-service portal.',
  },
  {
    icon: 'briefcase' as const,
    title: 'Reseller Program',
    description:
      'Purchase top-brand vouchers in bulk at a discount and resell them through your own channels.',
  },
]
</script>
