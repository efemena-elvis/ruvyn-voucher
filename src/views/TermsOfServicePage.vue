<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />
    <main class="container mx-auto px-6 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-extrabold mb-8 text-center">Terms of Service</h1>
        <p class="text-center text-text-secondary mb-10">Last updated: August 18, 2025</p>

        <div class="prose max-w-none">
          <p>
            Welcome to VoucherHub. These Terms of Service ("Terms") govern your use of the
            VoucherHub website and services ("Service"). By accessing or using our Service, you
            agree to be bound by these Terms.
          </p>

          <h2>1. User Accounts</h2>
          <p>
            To access certain features of the Service, you must register for an account. You agree
            to provide accurate, current, and complete information during the registration process
            and to update such information to keep it accurate. You are responsible for safeguarding
            your password and for any activities or actions under your account.
          </p>

          <h2>2. Voucher Purchase & Redemption</h2>
          <p>
            VoucherHub acts as a marketplace for digital vouchers issued by third-party brands
            ("Brands"). When you purchase a voucher, you are purchasing it from the respective
            Brand. Vouchers are subject to the terms and conditions set by the issuing Brand. It is
            your responsibility to review and understand these terms before purchase. All purchases
            are final and non-refundable, except as required by law.
          </p>

          <h2>3. Permitted Use</h2>
          <p>
            You agree not to use the Service for any unlawful purpose or in any way that interrupts,
            damages, or impairs the service. Prohibited activities include, but are not limited to:
            fraudulent purchases, attempting to redeem vouchers multiple times, and using automated
            systems to access the service.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain
            the exclusive property of VoucherHub and its licensors. Our trademarks may not be used
            in connection with any product or service without the prior written consent of
            VoucherHub.
          </p>

          <h2>5. Disclaimers</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. VoucherHub makes no
            warranties, express or implied, regarding the operation of the service or the
            information, content, or materials included therein.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall VoucherHub, nor its directors, employees, or partners, be liable for
            any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, or other intangible losses, resulting from your
            access to or use of the Service.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any
            time. We will provide at least 30 days' notice before any new terms take effect. By
            continuing to access or use our Service after those revisions become effective, you
            agree to be bound by the revised terms.
          </p>
        </div>
      </div>
    </main>
    <Footer
      :link-columns="footer.linkColumns"
      :social-links="footer.socialLinks"
      :copyright-text="footer.copyrightText"
    />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import Footer from '@/components/Footer.vue'
import { navigation, footer } from '@/data/layoutData'
</script>
