import { Inter } from '@next/font/google'
import PlantedNav from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <header>
        <PlantedNav />
      </header>
      <main>
      </main>
    </>
  )
}
