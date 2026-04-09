import type { ProductCategory } from '@/types/product'

type CreateOffersHrefParams = {
  page?: number
  category?: ProductCategory | null
}

export function createOffersHref({
  page = 1,
  category,
}: CreateOffersHrefParams = {}) {
  const searchParams = new URLSearchParams()

  if (page > 1) {
    searchParams.set('page', String(page))
  }

  if (category) {
    searchParams.set('category', category)
  }

  const query = searchParams.toString()

  return query ? `/ofertas?${query}` : '/ofertas'
}
