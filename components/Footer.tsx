import type { Restaurant } from '@/lib/delimenu'
import { whatsappUrl } from '@/lib/delimenu'
import { BackToTop } from './BackToTop'
import { Reveal } from './Reveal'

export function Footer({ restaurant }: { restaurant: Restaurant }) {
  const contactUrl = whatsappUrl(restaurant.phone, restaurant.name) ?? restaurant.menu_url
  const year = new Date().getFullYear()

  const links = (
    <nav className="flex items-center gap-7">
      <a href={restaurant.menu_url} className="text-ink no-underline">
        INICIO
      </a>
      <a href="/menu" aria-current="page" className="text-red no-underline">
        MENÚ
      </a>
      <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="text-ink no-underline">
        CONTACTO
      </a>
    </nav>
  )

  const copyright = (
    <p className="text-ink/82 uppercase">
      © {year} {restaurant.name} — Todos los derechos reservados
    </p>
  )

  const tagline = (
    <p className="text-ink/82 uppercase">
      {restaurant.address ? `${restaurant.address} · ` : ''}Hecho con la API de Delimenu
    </p>
  )

  return (
    <Reveal
      as="footer"
      className="flex flex-col items-center gap-4 text-center tablet:items-stretch tablet:gap-[22px] tablet:px-5 tablet:pt-[30px] tablet:text-left"
    >
      <div className="flex w-full flex-col items-center gap-4 text-[18px] leading-[18px] tablet:flex-row tablet:justify-between tablet:gap-5 tablet:text-[20px] tablet:leading-[20px]">
        <div className="text-[18px] leading-[18px] tablet:text-[22px] tablet:leading-[22px]">{links}</div>
        <div className="hidden text-right tablet:block">{copyright}</div>
      </div>
      <div className="h-px w-full bg-ink/18" />
      <div className="text-[20px] leading-[20px] tablet:text-[24px] tablet:leading-[24px]">{tagline}</div>
      <div className="text-[18px] leading-[18px] tablet:hidden">{copyright}</div>
      <BackToTop />
    </Reveal>
  )
}
