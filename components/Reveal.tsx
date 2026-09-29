'use client'

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType } from 'react'

type RevealProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

/** Fades its content in the first time it enters the viewport. */
export function Reveal<T extends ElementType = 'div'>({ as, className, ...rest }: RevealProps<T>) {
  const Tag: ElementType = as ?? 'div'
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={['reveal', className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}
