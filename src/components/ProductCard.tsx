import type { ProductCardData } from '@/types/product'
import Image from 'next/image'

type ProductCardProps = {
  product: ProductCardData
}

const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm group transition-shadow duration-300 hover:shadow-md">
      <figure className="aspect-square w-full bg-slate-50 p-6">
        <div className="relative size-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 242px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 5rem)"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </figure>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <h2 className="min-h-12 overflow-hidden text-base leading-6 font-semibold text-slate-900 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {product.title}
          </h2>

          <p className="text-lg font-bold text-slate-900">
            {priceFormatter.format(product.price)}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 cursor-pointer"
        >
          Comprar
        </button>
      </div>
    </article>
  )
}

export default ProductCard
