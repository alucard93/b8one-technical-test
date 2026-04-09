import type { ProductCardData } from '@/types/product'
import ProductCard from './ProductCard'

type ProductGridProps = {
  products: ProductCardData[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return null
  }

  return (
    <section aria-label="Vitrine de produtos">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <li key={product.id} className="h-full">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductGrid
