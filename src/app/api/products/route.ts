import { NextResponse } from 'next/server'

import type { ProductsDb } from '@/types/product'
import productsDb from '../../../../product.json'

const PRODUCTS_PER_PAGE = 6

export async function GET() {
  const { products } = productsDb as ProductsDb

  return NextResponse.json(products.slice(0, PRODUCTS_PER_PAGE))
}
