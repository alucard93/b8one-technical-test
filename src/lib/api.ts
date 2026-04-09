import type { Product, ProductCardData } from '@/types/product'

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

export async function getProductCards(): Promise<ProductCardData[]> {
  const response = await fetch(`${getBaseUrl()}/api/products`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar produtos')
  }

  const products: Product[] = await response.json()

  return products.map(toProductCardData)
}
