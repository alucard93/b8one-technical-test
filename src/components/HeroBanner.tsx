import Image from 'next/image'

import bannerCategory from '../../public/banner-category.webp'

const HeroBanner = () => {
  return (
    <section aria-label="Banner principal de ofertas" className="w-full">
      <div className="relative w-full overflow-hidden bg-slate-100 aspect-4/3 md:aspect-3/1">
        <Image
          src={bannerCategory}
          alt="Banner promocional das ofertas da semana"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-left"
        />
      </div>
    </section>
  )
}

export default HeroBanner
