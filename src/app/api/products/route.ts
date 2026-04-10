import { NextResponse } from 'next/server'

import productsDb from '@/db/product.json'
import {
  PRODUCT_CATEGORIES,
  type PaginatedProductsResponse,
  type ProductCategory,
  type ProductsDb,
} from '@/types/product'
import { parsePage } from '@/utils/parsePage'

const PRODUCTS_PER_PAGE = 6

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const { products, filters } = productsDb as ProductsDb
  const currentPage = parsePage(searchParams.get('page'))
  const requestedCategory = searchParams.get('category')
  const hasRequestedCategory =
    requestedCategory !== null && requestedCategory !== ''
  const selectedCategory =
    hasRequestedCategory &&
    PRODUCT_CATEGORIES.includes(requestedCategory as ProductCategory)
      ? (requestedCategory as ProductCategory)
      : null
  const hasInvalidCategory = hasRequestedCategory && selectedCategory === null
  const filteredProducts = hasInvalidCategory
    ? []
    : selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products
  const totalItems = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / PRODUCTS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  )

  const response: PaginatedProductsResponse = {
    currentPage: safeCurrentPage,
    totalPages,
    totalItems,
    availableCategories: filters.categories,
    hasInvalidCategory,
    selectedCategory,
    data: paginatedProducts,
  }

  return NextResponse.json(response)
}
