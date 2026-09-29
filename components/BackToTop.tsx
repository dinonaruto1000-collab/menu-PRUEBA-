'use client'

/** Scrolls both the page (phones) and the menu pane (tablet and up) back to the top. */
export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={(event) => {
        event.currentTarget.closest('section[data-scroll-pane]')?.scrollTo({ top: 0, behavior: 'smooth' })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className="flex size-[30px] cursor-pointer items-center justify-center rounded-full border-0 bg-white p-2"
    >
      <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red">
        <path d="M7 12.5V1.5M2 6.5l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
