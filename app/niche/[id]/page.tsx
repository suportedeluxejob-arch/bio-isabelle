"use client"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import VisualBanner from "@/components/visual-banner"
import { use } from "react"

export default function NichePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data } = useAdmin()

  const card = data.mainCards.find((c) => c.id === id)
  const banners = data.categoryContents[id] || []
  const accentColor = card?.accentColor || "#8b5cf6"

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 italic text-white">Página não encontrada</h1>
          <Link href="/" className="text-purple-500 hover:underline">
            Voltar para Home
          </Link>
        </div>
      </div>
    )
  }

  const renderTitle = (label: string) => {
    const words = label.split(" ")
    if (words.length > 1) {
      return (
        <>
          {words[0]} <span style={{ color: accentColor }}>{words.slice(1).join(" ")}</span>
        </>
      )
    }
    return label
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest font-mono">Voltar</span>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-4 italic leading-tight">
            {renderTitle(card.label)}
          </h1>
          <p className="text-gray-400 max-w-2xl font-medium">{card.sublabel}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {banners.map((banner, index) => (
            <VisualBanner
              key={banner.id}
              title={banner.title}
              image={banner.image}
              link={banner.link}
              index={index}
              accentColor={accentColor}
            />
          ))}
          {banners.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-xl">
              <p className="text-gray-500 font-mono tracking-widest uppercase">Conteúdo sendo preparado...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
