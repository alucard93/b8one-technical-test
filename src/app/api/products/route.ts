import { NextResponse } from 'next/server'

import productsDb from '@/db/product.json'
import type { PaginatedProductsResponse, ProductsDb } from '@/types/product'
import { parsePage } from '@/utils/parsePage'

const PRODUCTS_PER_PAGE = 6

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const { products } = productsDb as ProductsDb
  const currentPage = parsePage(searchParams.get('page'))
  const totalItems = products.length
  const totalPages = Math.max(1, Math.ceil(totalItems / PRODUCTS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  )

  const response: PaginatedProductsResponse = {
    currentPage: safeCurrentPage,
    totalPages,
    totalItems,
    data: paginatedProducts,
  }

  return NextResponse.json(response)
}
