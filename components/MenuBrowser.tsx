'use client'

import { useSyncExternalStore, type ReactNode } from 'react'
import type { Category } from '@/lib/delimenu'
import { slugify } from '@/lib/delimenu'
import { ProductCard } from './ProductCard'
import { Reveal } from './Reveal'

/** Query parameter that keeps the selected category, so a filtered menu can be shared. */
const PARAM = 'categoria'
const CHANGE_EVENT = 'menu-category-change'

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

const readSelected = () => new URLSearchParams(window.location.search).get(PARAM)

function selectCategory(slug: string | null) {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set(PARAM, slug)
  else url.searchParams.delete(PARAM)
  window.history.replaceState(null, '', url)
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'flex cursor-pointer items-center overflow-clip rounded-[999px] border-0 px-3 py-1.5 font-[inherit] transition-colors duration-200',
        active ? 'bg-red text-white' : 'bg-pill text-ink-soft hover:bg-cream',
      ].join(' ')}
    >
      <p className="text-[16px] leading-[16px] tracking-[-0.16px] whitespace-nowrap uppercase">{label}</p>
    </button>
  )
}

/** Category pills, the product grid they filter, and whatever follows it (the footer). */
export function MenuBrowser({
  categories,
  currency,
  children,
}: {
  categories: Category[]
  currency: string
  children: ReactNode
}) {
  const selected = useSyncExternalStore(subscribe, readSelected, () => null)
  const active = categories.find((c) => slugify(c.name) === selected) ?? null
  const products = (active ? [active] : categories).flatMap((c) => c.products)

  return (
    <>
      <Reveal
        as="nav"
        aria-label="Categorías"
        className="no-scrollbar sticky top-[3px] z-20 shrink-0 overflow-x-auto bg-white p-1"
      >
        {/* Centred on phones like the reference; scrolls sideways when the names do not fit. */}
        <div className="mx-auto flex w-max gap-1 tablet:mx-0">
          <Pill label="Todo" active={!active} onClick={() => selectCategory(null)} />
          {categories.map((category) => (
            <Pill
              key={category.id}
              label={category.name}
              active={active?.id === category.id}
              onClick={() => selectCategory(slugify(category.name))}
            />
          ))}
        </div>
      </Reveal>

      <section className="flex flex-col gap-[60px] p-4 tablet:py-5 tablet:pr-5 tablet:pl-0">
        <div className="grid grid-cols-2 gap-2 desktop:grid-cols-3">
          {products.map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} currency={currency} />
            </Reveal>
          ))}
        </div>
        {children}
      </section>
    </>
  )
}
