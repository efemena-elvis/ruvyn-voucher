export interface Category {
  slug: string
  name: string
  description: string
  color?: string // Optional color for styling
  children?: Category[] // Nested subcategories
}

export const categories: Category[] = [
  {
    slug: 'utility-bills',
    name: 'Utilities & Bills',
    description: 'Pay for electricity, airtime, and data.',
    color: '#0e7490', // Teal
    children: [
      { slug: 'airtime', name: 'Airtime', description: 'Top up any mobile network.' },
      { slug: 'data', name: 'Data Bundles', description: 'Stay connected with mobile data.' },
      {
        slug: 'electricity',
        name: 'Electricity',
        description: 'Pay for prepaid electricity tokens.',
      },
    ],
  },
  {
    slug: 'entertainment',
    name: 'Entertainment',
    description: 'Streaming, gaming, and movie tickets.',
    color: '#ca8a04', // Yellow
    children: [
      { slug: 'tv-streaming', name: 'TV & Streaming', description: 'Netflix, DStv, and more.' },
      { slug: 'gaming', name: 'Gaming', description: 'Steam, PlayStation, and Xbox.' },
    ],
  },
  {
    slug: 'food-retail',
    name: 'Food & Retail',
    description: 'For restaurants, groceries, and shopping.',
    color: '#c2410c', // Orange
  },
  {
    slug: 'travel',
    name: 'Travel',
    description: 'For flights, rides, and accommodations.',
    color: '#4f46e5', // Primary Purple
  },
    {
    slug: 'storefront',
    name: 'Storefront',
    description: 'For online stores and e-commerce.',
    color: '#4f46e5', // Primary Purple
  },
]

// Helper function to get all child slugs for a parent category
export const getSlugsForParentCategory = (parentSlug: string): string[] => {
  const parent = categories.find((c) => c.slug === parentSlug)
  if (!parent) return []
  if (!parent.children) return [parent.name] // It's a parent with no children

  return [parent.slug, ...parent.children.map((child) => child.name)]
}
