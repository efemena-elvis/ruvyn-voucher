// This file becomes the single source of truth for all voucher information.

export interface Voucher {
  id: number
  title: string
  brandImage: string
  description: string
  url: string
  category?: string
  priceOptions: number[] // For pre-set amounts
  allowsCustomAmount: boolean // To enable/disable custom input
}

export const allVouchers: Voucher[] = [
  {
    id: 1,
    title: 'Spotify Premium',
    brandImage: 'https://placehold.co/400x225/1DB954/FFFFFF?text=Spotify+Premium',
    description: 'Visa Virtual Account',
    url: '/vouchers/1',
    category: 'Most Popular',
    priceOptions: [1000, 2500, 5000],
    allowsCustomAmount: true,
  },
  {
    id: 2,
    title: 'SHEIN',
    brandImage: 'https://placehold.co/400x225/000000/FFFFFF?text=SHEIN',
    description: 'Prepaid Mastercard', // CHANGED
    url: '/vouchers/2',
    category: 'Featured',
    priceOptions: [5000, 10000, 20000],
    allowsCustomAmount: false,
  },
  {
    id: 3,
    title: 'TEMU',
    brandImage: 'https://placehold.co/400x225/FF7518/FFFFFF?text=TEMU',
    description: 'GiftCards.com Card', // CHANGED
    url: '/vouchers/3',
    category: 'Featured',
    priceOptions: [2000, 4000, 6000],
    allowsCustomAmount: true,
  },
  {
    id: 4,
    title: 'Netflix',
    brandImage: 'https://placehold.co/400x225/E50914/FFFFFF?text=NETFLIX',
    description: 'Target Rewards Card', // CHANGED
    url: '/vouchers/4',
    category: 'Just Added',
    priceOptions: [4000, 8000, 12000],
    allowsCustomAmount: false,
  },
  {
    id: 5,
    title: 'Amazon',
    brandImage: 'https://placehold.co/400x225/00A2E8/FFFFFF?text=amazon',
    description: 'Vanilla e-Card', // CHANGED
    url: '/vouchers/5',
    category: 'Most Popular',
    priceOptions: [5000, 15000, 25000],
    allowsCustomAmount: true,
  },
  {
    id: 6,
    title: 'Uber',
    brandImage: 'https://placehold.co/400x225/000000/FFFFFF?text=Uber',
    description: 'Ride & Eats Credit', // CHANGED
    url: '/vouchers/6',
    category: 'Travel',
    priceOptions: [2000, 5000, 10000],
    allowsCustomAmount: true,
  },
  {
    id: 7,
    title: 'Apple',
    brandImage: 'https://placehold.co/400x225/222222/FFFFFF?text=+Card',
    description: 'Apple Account Balance', // CHANGED
    url: '/vouchers/7',
    category: 'Featured',
    priceOptions: [5000, 10000, 25000],
    allowsCustomAmount: false,
  },
  {
    id: 8,
    title: 'Jumia Food',
    brandImage: 'https://placehold.co/400x225/f68b1e/FFFFFF?text=Jumia+Food',
    description: 'Restaurant Delivery',
    url: '/vouchers/8',
    category: 'Food & Drink',
    priceOptions: [1500, 3000, 4500],
    allowsCustomAmount: true,
  },
  {
    id: 9,
    title: 'Steam Wallet',
    brandImage: 'https://placehold.co/400x225/1B2838/FFFFFF?text=STEAM',
    description: 'For PC games and software.',
    url: '/vouchers/9',
    category: 'Entertainment',
    priceOptions: [2000, 5000, 10000],
    allowsCustomAmount: true,
  },
  {
    id: 10,
    title: 'ASOS',
    brandImage: 'https://placehold.co/400x225/000000/FFFFFF?text=ASOS',
    description: 'Latest trends in fashion.',
    url: '/vouchers/10',
    category: 'Featured',
    priceOptions: [10000, 25000, 50000],
    allowsCustomAmount: false,
  },
  {
    id: 11,
    title: 'Shoprite',
    brandImage: 'https://placehold.co/400x225/D92312/FFFFFF?text=Shoprite',
    description: 'Groceries and everyday essentials.',
    url: '/vouchers/11',
    category: 'Most Popular',
    priceOptions: [5000, 10000, 20000],
    allowsCustomAmount: true,
  },
  {
    id: 12,
    title: 'Glovo',
    brandImage: 'https://placehold.co/400x225/FFC244/000000?text=Glovo',
    description: 'Anything you need, delivered.',
    url: '/vouchers/12',
    category: 'Food & Drink',
    priceOptions: [1500, 3000, 5000],
    allowsCustomAmount: false,
  },
]

// A helper function to easily find a voucher by its ID
export const findVoucherById = (id: number): Voucher | undefined => {
  return allVouchers.find((v) => v.id === id)
}
