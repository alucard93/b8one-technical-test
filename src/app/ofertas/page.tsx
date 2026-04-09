import HeroBanner from '@/components/HeroBanner'

const Ofertas = () => {
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
      </section>
    </main>
  )
}

export default Ofertas
