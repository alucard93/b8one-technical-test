import CategoryFilter from '@/components/CategoryFilter'
import HeroBanner from '@/components/HeroBanner'
import Pagination from '@/components/Pagination'
import ProductGrid from '@/components/ProductGrid'
import { getProductCards } from '@/lib/api'
import { parsePage } from '@/utils/parsePage'

type OfertasPageProps = {
  searchParams?: Promise<{
    category?: string
    page?: string
  }>
}

const Ofertas = async ({ searchParams }: OfertasPageProps) => {
  const resolvedSearchParams = await searchParams
  const requestedPage = parsePage(resolvedSearchParams?.page)
  const requestedCategory = resolvedSearchParams?.category ?? null
  const {
    products,
    currentPage,
    totalPages,
    availableCategories,
    hasInvalidCategory,
    selectedCategory,
  } = await getProductCards(requestedPage, requestedCategory)

  return (
    <main className="flex w-full flex-col gap-8">
      <HeroBanner />

      <section
        aria-labelledby="ofertas-title"
        className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-6 md:px-6 md:pb-8"
      >
        <h1
          id="ofertas-title"
          className="font-heading text-3xl font-semibold text-slate-900 md:text-4xl"
        >
          Ofertas da Semana
        </h1>

        <CategoryFilter
          categories={availableCategories}
          hasInvalidCategory={hasInvalidCategory}
          selectedCategory={selectedCategory}
        />
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600">
            {hasInvalidCategory
              ? 'A categoria informada nao existe no cadastro.'
              : 'Nenhum produto encontrado para a categoria selecionada.'}
          </p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          selectedCategory={selectedCategory}
        />
      </section>
    </main>
  )
}

export default Ofertas
