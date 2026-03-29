import { LandingNavbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Beneficios } from "@/components/landing/beneficios"
import { Precios } from "@/components/landing/precios"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <LandingNavbar />
      <main>
        <Hero />
        <Beneficios />
        <Precios />
      </main>
      <Footer />
    </div>
  )
}
