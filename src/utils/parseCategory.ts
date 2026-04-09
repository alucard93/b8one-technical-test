import { PRODUCT_CATEGORIES, type ProductCategory } from '@/types/product'

export function parseCategory(value?: string | null): ProductCategory | null {
  if (!value) {
    return null
  }

  if (!PRODUCT_CATEGORIES.includes(value as ProductCategory)) {
    return null
  }

  return value as ProductCategory
}
