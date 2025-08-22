// --- TYPE DEFINITIONS ---
// These interfaces define the "shape" of our layout data, ensuring type-safety.

// For NavigationBar component
interface NavLink {
  text: string
  url: string
}

interface UserAction {
  text: string
  url: string
}

// For Footer component
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

// --- NAVIGATION DATA ---
// A single source of truth for the main site navigation.
export const navigation = {
  logoText: 'RUVYN',
  navLinks: <NavLink[]>[
    { text: 'Categories', url: '/categories' },
    { text: 'Brands', url: '/brands' },
    { text: 'For Business', url: '/for-business' },
    { text: 'Verify Payment', url: '/verify-payment' },
  ],
  userActions: <UserAction[]>[
    { text: 'Sign In', url: '/signin' },
    { text: 'Register', url: '/register' },
  ],
}

// --- FOOTER DATA ---
// A single source of truth for the site footer.
export const footer = {
  linkColumns: <FooterColumn[]>[
    {
      title: 'Company',
      links: [
        { text: 'For Business', url: '/for-business' },
        { text: 'Contact Us', url: '/contact' },
        { text: 'Verify Payment', url: '/verify-payment' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Terms of Service', url: '/terms-of-service' },
        { text: 'Privacy Policy', url: '/privacy-policy' },
      ],
    },
  ],
  socialLinks: <SocialLink[]>[
    { platform: 'Twitter', url: 'https://twitter.com' },
    { platform: 'Facebook', url: 'https://facebook.com' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
  ],
  address: '4 Cade Street, Southcrest, Alberton',
  copyrightText: `© ${new Date().getFullYear()} RUVYN. All rights reserved.`,
}
