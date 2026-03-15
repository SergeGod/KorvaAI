import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <Hero />
      <Services />
      <Projects />
      <Contact />
    </main>
  )
}
