import type {
  PaginatedProductsResponse,
  Product,
  ProductCardData,
} from '@/types/product'

const PRODUCTS_API_URL = 'http://localhost:4000/products?_page=1&_per_page=6'

function toProductCardData(product: Product): ProductCardData {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  }
}

export async function getProductCards(): Promise<ProductCardData[]> {
  const response = await fetch(PRODUCTS_API_URL, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos')
  }

  const result: PaginatedProductsResponse = await response.json()

  return result.data.map(toProductCardData)
}
