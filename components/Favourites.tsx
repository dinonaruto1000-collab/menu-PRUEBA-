import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { Product } from '@/lib/delimenu'
import { Reveal } from './Reveal'

const ITEM_WIDTH = 154
const ITEM_GAP = 10
/** Ticker speed of the reference. */
const PIXELS_PER_SECOND = 50
/** Widest the ticker ever gets (desktop column minus padding). */
const MAX_VISIBLE_WIDTH = 600

/** Endless ticker of product photos, hidden on phones like the reference. */
export function Favourites({ products }: { products: Product[] }) {
  const loopWidth = products.length * (ITEM_WIDTH + ITEM_GAP)
  // Enough copies that the strip never shows its end while it loops.
  const copies = Math.max(2, Math.ceil(MAX_VISIBLE_WIDTH / loopWidth) + 1)
  const items = Array.from({ length: copies }, (_, copy) =>
    products.map((product) => ({ product, key: `${copy}-${product.id}`, copy })),
  ).flat()

  const tickerStyle = {
    '--ticker-distance': `-${loopWidth}px`,
    '--ticker-duration': `${loopWidth / PIXELS_PER_SECOND}s`,
  } as CSSProperties

  return (
    <Reveal as="section" className="hidden flex-col justify-center gap-[15px] overflow-clip tablet:flex">
      <p className="text-[40px] leading-[48px] text-red uppercase">Nuestros favoritos</p>
      <div className="relative h-[116px] overflow-clip">
        <ul className="ticker m-0 flex w-max list-none gap-[10px] p-0" style={tickerStyle}>
          {items.map(({ product, key, copy }) => (
            <li
              key={key}
              aria-hidden={copy > 0}
              className="h-[116px] w-[154px] shrink-0 rounded-[14px] bg-white p-[2px]"
            >
              <div className="relative size-full overflow-hidden rounded-[12px]">
                <Image
                  src={product.image_url!}
                  alt={copy === 0 ? product.name : ''}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
