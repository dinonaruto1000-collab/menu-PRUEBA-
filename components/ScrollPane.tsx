'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Right column. From tablet up it is its own scroll container, so the left
 * column stays put; on phones the page scrolls. Either way the red bar on top
 * tracks how far down the menu the visitor is.
 */
export function ScrollPane({ children }: { children: ReactNode }) {
  const paneRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const pane = paneRef.current
    if (!pane) return

    const update = () => {
      const paneScrolls = pane.scrollHeight > pane.clientHeight + 1 && getComputedStyle(pane).overflowY !== 'visible'
      const [top, max] = paneScrolls
        ? [pane.scrollTop, pane.scrollHeight - pane.clientHeight]
        : [window.scrollY, document.documentElement.scrollHeight - window.innerHeight]
      setProgress(max > 0 ? Math.min(1, Math.max(0, top / max)) : 0)
    }

    update()
    pane.addEventListener('scroll', update, { passive: true })
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      pane.removeEventListener('scroll', update)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section
      ref={paneRef}
      data-scroll-pane
      className="no-scrollbar relative flex min-w-0 flex-1 flex-col bg-cream tablet:h-dvh tablet:overflow-auto"
    >
      <div className="fixed inset-x-0 top-0 z-30 h-[3px] tablet:sticky tablet:shrink-0">
        <div className="h-full bg-red" style={{ width: `${progress * 100}%` }} />
      </div>
      {children}
    </section>
  )
}
