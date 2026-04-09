import Link from 'next/link'

import type { ProductCategory } from '@/types/product'
import { createOffersHref } from '@/utils/createOffersHref'

type CategoryFilterProps = {
  categories: ProductCategory[]
  hasInvalidCategory: boolean
  selectedCategory: ProductCategory | null
}

const categoryLabels: Record<ProductCategory, string> = {
  electronics: 'Eletronicos',
  jewelery: 'Joias',
  "men's clothing": 'Moda Masculina',
  "women's clothing": 'Moda Feminina',
}

const baseClassName =
  'inline-flex min-h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors'

const CategoryFilter = ({
  categories,
  hasInvalidCategory,
  selectedCategory,
}: CategoryFilterProps) => {
  if (categories.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="Filtrar produtos por categoria"
      className="flex flex-col gap-3"
    >
      <p className="text-base font-bold text-slate-700">Categorias</p>

      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href={createOffersHref()}
            aria-current={
              !hasInvalidCategory && selectedCategory === null
                ? 'true'
                : undefined
            }
            className={`${baseClassName} ${
              !hasInvalidCategory && selectedCategory === null
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            Todas
          </Link>
        </li>

        {categories.map((category) => (
          <li key={category}>
            <Link
              href={createOffersHref({ category })}
              aria-current={selectedCategory === category ? 'true' : undefined}
              className={`${baseClassName} ${
                selectedCategory === category
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {categoryLabels[category]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CategoryFilter
