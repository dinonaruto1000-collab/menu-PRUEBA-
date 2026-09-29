import Image from 'next/image'
import type { Menu } from '@/lib/delimenu'
import { pickFavourites, whatsappUrl } from '@/lib/delimenu'
import { Favourites } from './Favourites'
import { Reveal } from './Reveal'
import { Wordmark } from './Wordmark'

function listCategories(names: string[]): string {
  const lower = names.map((name) => name.toLocaleLowerCase('es'))
  if (lower.length <= 1) return lower.join('')
  return `${lower.slice(0, -1).join(', ')} y ${lower.at(-1)}`
}

function NavPill({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={[
        'flex items-center rounded-[100px] px-4 py-1.5 transition-colors duration-200',
        active ? 'bg-red text-cream' : 'bg-cream/0 text-ink hover:bg-cream',
      ].join(' ')}
    >
      <p className="text-[17px] leading-[20.4px] tracking-[0.47px] uppercase">{label}</p>
    </a>
  )
}

/** Left column: brand, navigation, favourites ticker and the wordmark. */
export function Sidebar({ menu }: { menu: Menu }) {
  const { restaurant, categories } = menu
  const reserveUrl = whatsappUrl(restaurant.phone, restaurant.name) ?? restaurant.menu_url
  const favourites = pickFavourites(menu)

  return (
    <section className="relative flex flex-col bg-cream tablet:sticky tablet:top-0 tablet:h-dvh tablet:w-[40%] tablet:shrink-0">
      <div className="h-[3px] shrink-0 bg-cream" />
      <div className="relative flex flex-1 flex-col justify-between px-4 pt-4 pb-8 tablet:p-5 tablet:after:pointer-events-none tablet:after:absolute tablet:after:inset-0 tablet:after:border-r-2 tablet:after:border-white tablet:after:content-['']">
        <Reveal as="header" className="flex flex-col gap-8">
          <nav className="flex items-center justify-between gap-3">
            <a
              href={restaurant.menu_url}
              className="relative block size-11 shrink-0 overflow-clip rounded-[10px]"
              aria-label={restaurant.name}
            >
              {restaurant.logo_url ? (
                <Image src={restaurant.logo_url} alt="" fill sizes="44px" className="object-cover" priority />
              ) : (
                <span className="absolute inset-0 bg-red" />
              )}
            </a>
            <div className="flex items-center gap-1 rounded-[100px] bg-white p-1">
              <NavPill href={restaurant.menu_url} label="Inicio" />
              <NavPill href="/menu" label="Menú" active />
              <NavPill href={reserveUrl} label="Reservar" />
            </div>
          </nav>

          <p className="max-w-[520px] text-[20px] leading-[26px] tablet:text-[20px] tablet:leading-[26px] desktop:text-[22px] desktop:leading-[28.6px]">
            Sabores urbanos preparados al momento: {listCategories(categories.map((c) => c.name))}.
          </p>

          <a
            href={reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[58px] items-start self-center overflow-hidden rounded-[42px_34px_46px_30px] px-8 py-[18px] tablet:self-start"
          >
            <span className="absolute inset-0 rounded-[48px_38px_50px_34px] bg-[rgb(249,25,20)]" />
            <span className="relative block h-[22px] overflow-hidden">
              <span className="flex flex-col gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-[30px]">
                <p className="text-[20px] leading-[22px] whitespace-nowrap text-white uppercase">Reservar mesa</p>
                <p aria-hidden className="text-[20px] leading-[22px] whitespace-nowrap text-white uppercase">
                  Reservar mesa
                </p>
              </span>
            </span>
          </a>
        </Reveal>

        {favourites.length > 0 && <Favourites products={favourites} />}

        <Reveal className="hidden tablet:block">
          <Wordmark text={restaurant.name.toLocaleUpperCase('es')} />
        </Reveal>
      </div>
    </section>
  )
}
