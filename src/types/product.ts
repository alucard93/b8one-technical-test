export type ProductCategory =
  | 'electronics'
  | 'jewelery'
  | "men's clothing"
  | "women's clothing"

export type ProductRating = {
  rate: number
  count: number
}

export type Product = {
  id: string
  title: string
  price: number
  category: ProductCategory
  brand: string
  stock: number
  isNew: boolean
  discount: number
  createdAt: string
  image: string
  rating: ProductRating
}

export type ProductCardData = Pick<Product, 'id' | 'title' | 'price' | 'image'>

export type ProductFilters = {
  categories: ProductCategory[]
  brands: string[]
  priceRange: {
    min: number
    max: number
  }
}

export type ProductsDb = {
  products: Product[]
  filters: ProductFilters
}

export type PaginatedResponse<T> = {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: T[]
}

export type PaginatedProductsResponse = PaginatedResponse<Product>
