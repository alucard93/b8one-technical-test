import HeroBanner from '@/components/HeroBanner'
import Pagination from '@/components/Pagination'
import ProductGrid from '@/components/ProductGrid'
import { getProductCards } from '@/lib/api'
import { parsePage } from '@/utils/parsePage'

type OfertasPageProps = {
  searchParams?: Promise<{
    page?: string
  }>
}

const Ofertas = async ({ searchParams }: OfertasPageProps) => {
  const resolvedSearchParams = await searchParams
  const requestedPage = parsePage(resolvedSearchParams?.page)
  const { products, currentPage, totalPages } =
    await getProductCards(requestedPage)

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

        <ProductGrid products={products} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </section>
    </main>
  )
}

export default Ofertas
