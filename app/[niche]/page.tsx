"use client"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useAdmin } from "@/contexts/admin-context"
import EmpireCard from "@/components/empire-card"
import VisualBanner from "@/components/visual-banner"
import { ArrowLeft, Crown } from "lucide-react"

export default function NichePage() {
  const params = useParams()
  const router = useRouter()
  const { data } = useAdmin()

  const category = data.mainCards.find((c) => c.id === params.niche)
  const categoryContents = category ? data.categoryContents[category.id] || [] : []

  if (!category) {
    return (
      <div className="empire-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Crown className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Categoria não encontrada</h1>
          <button onClick={() => router.push("/")} className="empire-btn px-6 py-3 rounded-full mt-4">
            Voltar ao Início
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="empire-bg pattern-overlay min-h-screen">
      <div className="max-w-lg mx-auto pb-12">
        {/* Hero Section */}
        <div className="relative h-48 overflow-hidden">
          <Image src={category.coverImage || "/placeholder.svg"} alt={category.label} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#0a0a0a]" />

          {/* Back Button */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 border border-[#d4af37]/30 hover:border-[#d4af37] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#d4af37]" />
          </button>

          {/* Category Title */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold empire-gold-gradient">{category.label}</h1>
                <p className="text-gray-400 text-sm">{category.sublabel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="px-4 pt-6 space-y-6">
          {/* Visual Banners */}
          {categoryContents.length > 0 && (
            <section>
              <div className="grid gap-4">
                {categoryContents.map((banner) => (
                  <VisualBanner
                    key={banner.id}
                    title={banner.title}
                    image={banner.image}
                    link={banner.link}
                    accentColor={category.accentColor}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Back to Home Button */}
          <div className="pt-4">
            <button
              onClick={() => router.push("/")}
              className="w-full empire-btn py-4 rounded-xl text-center font-bold"
            >
              ← Voltar ao Início
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
