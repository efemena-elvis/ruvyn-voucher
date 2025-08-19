<template>
  <div class="bg-background-default">
    <NavigationBar
      :logo-text="navigation.logoText"
      :nav-links="navigation.navLinks"
      :user-actions="navigation.userActions"
    />
    <main class="container mx-auto px-6 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-extrabold mb-8 text-center">Privacy Policy</h1>
        <p class="text-center text-text-secondary mb-10">Last updated: August 18, 2025</p>

        <div class="prose max-w-none">
          <p>
            VoucherHub ("we," "us," or "our") is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your information when you
            use our website and services ("Service").
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect personal information from you in a variety of ways, including:</p>
          <ul>
            <li>
              <strong>Personal Data:</strong> When you register for an account, we may ask for
              personally identifiable information, such as your name, email address, and phone
              number.
            </li>
            <li>
              <strong>Transaction Data:</strong> When you make a purchase, we collect information
              related to the transaction, such as the voucher purchased and payment details
              processed by our payment gateway (Paystack). We do not store your full credit card
              information.
            </li>
            <li>
              <strong>Usage Data:</strong> We may automatically collect information about how you
              access and use the Service, such as your IP address, browser type, pages visited, and
              the time and date of your visit.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain our Service.</li>
            <li>Process your transactions and manage your orders.</li>
            <li>
              Communicate with you, including sending you voucher details, expiration reminders, and
              promotional messages.
            </li>
            <li>Improve and personalize our Service.</li>
            <li>Monitor and prevent fraudulent activity.</li>
          </ul>

          <h2>3. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share your information with third-party
            service providers who perform services on our behalf, such as payment processing
            (Paystack) and email/SMS delivery. We may also disclose your information if required to
            do so by law.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your
            personal information. While we have taken reasonable steps to secure the personal
            information you provide to us, please be aware that no security measures are perfect or
            impenetrable.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal
            information, including the right to access, correct, or delete the information we hold
            about you.
          </p>

          <h2>6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page. You are advised to review this Privacy
            Policy periodically for any changes.
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
