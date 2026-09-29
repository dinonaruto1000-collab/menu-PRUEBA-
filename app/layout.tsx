import type { Metadata } from 'next'
import { Mouse_Memoirs } from 'next/font/google'
import './globals.css'

const mouseMemoirs = Mouse_Memoirs({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mouse-memoirs',
})

export const metadata: Metadata = {
  title: 'Menú — Ejemplo con la API de Delimenu',
  description: 'Un menú de restaurante construido con la API pública de Delimenu.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" className={mouseMemoirs.variable}>
      <body>
        <noscript>
          <style>{'.reveal{opacity:1}'}</style>
        </noscript>
        {children}
      </body>
    </html>
  )
}
