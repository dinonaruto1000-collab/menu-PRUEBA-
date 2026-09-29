'use client'

import { useLayoutEffect, useRef, useState } from 'react'

/** Size the reference sets the wordmark at before fitting it to the column. */
const BASE_FONT_SIZE = 432
const BASE_LINE_HEIGHT = 0.8
const BASE_STROKE = 12

type Fit = { lines: string[]; scale: number }

/** Every way of breaking the name into one or two lines, without splitting words. */
function candidateLayouts(text: string): string[][] {
  const words = text.split(/\s+/).filter(Boolean)
  const layouts = [[words.join(' ')]]
  for (let i = 1; i < words.length; i++) {
    layouts.push([words.slice(0, i).join(' '), words.slice(i).join(' ')])
  }
  return layouts
}

/**
 * The restaurant name set huge, red with a white outline, scaled so its widest
 * line fills the column — the reference's fit-text wordmark. A long name breaks
 * into two lines when that lets it render larger.
 */
export function Wordmark({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [fit, setFit] = useState<Fit | null>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    const probe = measureRef.current
    if (!container || !probe) return

    const measure = () => {
      const available = container.clientWidth
      if (!available) return

      const widthOf = (line: string) => {
        probe.textContent = line
        return probe.getBoundingClientRect().width
      }

      let best: Fit | null = null
      for (const lines of candidateLayouts(text)) {
        const widest = Math.max(...lines.map(widthOf))
        const scale = available / widest
        if (!best || scale > best.scale) best = { lines, scale }
      }
      setFit(best)
    }

    measure()
    document.fonts?.ready.then(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [text])

  const fontSize = BASE_FONT_SIZE * (fit?.scale ?? 0)
  const textStyle = {
    fontSize: `${BASE_FONT_SIZE}px`,
    lineHeight: BASE_LINE_HEIGHT,
    WebkitTextStroke: `${BASE_STROKE}px #ffffff`,
  }

  return (
    <div ref={containerRef} className="relative w-full" aria-label={text} role="img">
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap"
        style={textStyle}
      />
      <div
        aria-hidden
        className="flex flex-col items-center text-center text-red transition-opacity duration-500"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: BASE_LINE_HEIGHT,
          WebkitTextStroke: `${BASE_STROKE * (fit?.scale ?? 0)}px #ffffff`,
          opacity: fit ? 1 : 0,
        }}
      >
        {(fit?.lines ?? [text]).map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}
