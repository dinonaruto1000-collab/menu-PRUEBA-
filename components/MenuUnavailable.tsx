/** Shown when the API answers 404 (no such menu) or 403 (the restaurant has no active plan). */
export function MenuUnavailable({ status, message, name }: { status: number; message: string; name?: string }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-cream p-5 text-center">
      <p className="text-[64px] leading-[0.8] text-red uppercase">{name ?? 'Menú'}</p>
      <p className="max-w-[420px] text-[22px] leading-[28.6px]">{message}</p>
      {status > 0 && <p className="text-[16px] text-ink/50">Error {status}</p>}
    </main>
  )
}
