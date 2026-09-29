import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { MenuBrowser } from '@/components/MenuBrowser'
import { MenuUnavailable } from '@/components/MenuUnavailable'
import { ScrollPane } from '@/components/ScrollPane'
import { Sidebar } from '@/components/Sidebar'
import { fetchMenu } from '@/lib/delimenu'

// Rebuilt in the background at most every five minutes, so the API is not hit on every
// visit. Must be a literal (Next reads it statically); keep it equal to MENU_REVALIDATE_SECONDS.
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const result = await fetchMenu()
  if (!result.ok) return { title: 'Menú no disponible' }
  const { restaurant } = result.menu
  return {
    title: `Menú — ${restaurant.name}`,
    description: `El menú de ${restaurant.name}, servido desde la API de Delimenu.`,
    openGraph: restaurant.banner_url ? { images: [restaurant.banner_url] } : undefined,
  }
}

export default async function MenuPage() {
  const result = await fetchMenu()
  if (!result.ok) return <MenuUnavailable status={result.status} message={result.message} name={result.restaurantName} />

  const { menu } = result

  return (
    <>
      {/* Room for the progress bar, which is fixed to the top of the screen on phones. */}
      <div className="h-[3px] tablet:hidden" />
      <main className="relative flex flex-col bg-cream tablet:h-dvh tablet:flex-row tablet:justify-center tablet:overflow-hidden">
        <Sidebar menu={menu} />
        <ScrollPane>
          <MenuBrowser categories={menu.categories} currency={menu.restaurant.currency}>
            <Footer restaurant={menu.restaurant} />
          </MenuBrowser>
        </ScrollPane>
      </main>
    </>
  )
}
