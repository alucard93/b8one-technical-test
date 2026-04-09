import Link from 'next/link'

import type { ProductCategory } from '@/types/product'
import { createOffersHref } from '@/utils/createOffersHref'

type PaginationProps = {
  currentPage: number
  totalPages: number
  selectedCategory: ProductCategory | null
}

const Pagination = ({
  currentPage,
  totalPages,
  selectedCategory,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Paginacao dos produtos" className="pt-2">
      <ul className="flex flex-nowrap items-center justify-center gap-1">
        <li>
          {currentPage > 1 ? (
            <Link
              href={createOffersHref({
                page: currentPage - 1,
                category: selectedCategory,
              })}
              aria-label="Pagina anterior"
              className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 px-2.5 text-[11px] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Ant.
            </Link>
          ) : (
            <span
              aria-hidden="true"
              className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 px-2.5 text-[11px] font-medium text-slate-400"
            >
              Ant.
            </span>
          )}
        </li>

        {pages.map((page) => (
          <li key={page}>
            <Link
              href={createOffersHref({
                page,
                category: selectedCategory,
              })}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`inline-flex size-8 items-center justify-center rounded-lg border text-[11px] font-semibold transition-colors ${
                page === currentPage
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {page}
            </Link>
          </li>
        ))}

        <li>
          {currentPage < totalPages ? (
            <Link
              href={createOffersHref({
                page: currentPage + 1,
                category: selectedCategory,
              })}
              aria-label="Proxima pagina"
              className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 px-2.5 text-[11px] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Prox.
            </Link>
          ) : (
            <span
              aria-hidden="true"
              className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 px-2.5 text-[11px] font-medium text-slate-400"
            >
              Prox.
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
