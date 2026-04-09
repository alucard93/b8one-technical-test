import type {
  PaginatedProductsResponse,
  Product,
  ProductCardData,
  ProductCardsResult,
} from '@/types/product'

function toProductCardData(product: Product): ProductCardData {
  return {
    id: String(product.id),
    title: product.title,
    price: product.price,
    image: product.image,
  }
}

function getBaseUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return `http://localhost:${process.env.PORT ?? '3000'}`
}

export async function getProductCards(
  page = 1,
  category?: string | null,
): Promise<ProductCardsResult> {
  const searchParams = new URLSearchParams()

  searchParams.set('page', String(page))

  if (category) {
    searchParams.set('category', category)
  }

  const response = await fetch(
    `${getBaseUrl()}/api/products?${searchParams.toString()}`,
    {
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos')
  }

  const result: PaginatedProductsResponse = await response.json()

  return {
    products: result.data.map(toProductCardData),
    currentPage: result.currentPage,
    totalPages: result.totalPages,
    availableCategories: result.availableCategories,
    hasInvalidCategory: result.hasInvalidCategory,
    selectedCategory: result.selectedCategory,
  }
}
