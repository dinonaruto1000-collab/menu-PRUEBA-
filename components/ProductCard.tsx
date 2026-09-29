import Image from 'next/image'
import type { Product } from '@/lib/delimenu'
import { formatPrice } from '@/lib/delimenu'

/**
 * Square photo with a white strip underneath. On devices that hover, the strip
 * slides up to reveal the description, as in the reference.
 */
export function ProductCard({ product, currency }: { product: Product; currency: string }) {
  const onPromo = product.original_price !== undefined && product.original_price > product.price

  return (
    <article className="card-shape group relative flex overflow-hidden bg-cream pb-[70px] tablet:pb-[54px]">
      <div className="relative aspect-square w-full overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(min-width: 1200px) 276px, (min-width: 810px) 286px, 50vw"
            className={['object-cover', product.available ? '' : 'grayscale'].join(' ')}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-cream text-[40px] text-red/40 uppercase">
            {product.name.slice(0, 1)}
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col bg-white px-4 pt-4 pb-3">
        <div className="flex flex-col items-start tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-2">
          <p className="min-w-0 text-[17px] leading-[22.1px] uppercase tablet:text-[18px] tablet:leading-[23.4px] desktop:text-[20px] desktop:leading-[26px]">
            {product.name}
          </p>
          <div className="flex shrink-0 items-baseline gap-1.5">
            {onPromo && (
              <span className="text-[18px] leading-[26.4px] text-ink/50 line-through">
                {formatPrice(product.original_price!, currency)}
              </span>
            )}
            <h3 className="text-[24px] leading-[26.4px] text-red">
              {product.available ? formatPrice(product.price, currency) : 'Agotado'}
            </h3>
          </div>
        </div>

        {product.description && (
          <div className="hidden grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] hover-hover:grid">
            <div className="overflow-hidden">
              <p className="pt-2 text-[20px] leading-[28px]">{product.description}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
