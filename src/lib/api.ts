import type {
  ProductsDb,
  ProductCardData,
} from '@/types/product'
import productsDb from '../../product.json'

const PRODUCTS_PER_PAGE = 6

function toProductCardData(
  product: ProductsDb['products'][number],
): ProductCardData {
  return {
    id: String(product.id),
    title: product.title,
    price: product.price,
    image: product.image,
  }
}

export async function getProductCards(): Promise<ProductCardData[]> {
  const { products } = productsDb as ProductsDb

  return products.slice(0, PRODUCTS_PER_PAGE).map(toProductCardData)
}
