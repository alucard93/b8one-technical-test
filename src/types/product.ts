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
  id: string | number
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

export type PaginatedProductsResponse = {
  currentPage: number
  totalPages: number
  totalItems: number
  data: Product[]
}

export type ProductCardsResult = {
  products: ProductCardData[]
  currentPage: number
  totalPages: number
}
