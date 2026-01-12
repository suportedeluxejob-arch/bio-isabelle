"use client"

import { useAdmin } from "@/contexts/admin-context"
import EmpireHeader from "@/components/empire-header"
import EmpireCard from "@/components/empire-card"
import { useEffect, useState } from "react"

export default function HomePage() {
  const { data, isLoading } = useAdmin()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setIsReady(true)
    }
  }, [isLoading])

  const cards = data.mainCards

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <EmpireHeader profile={data.profile} />

      <main className="flex-grow w-full px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const isExternal = card.path.startsWith("http")
            const targetPath = isExternal ? card.path : `/niche/${card.id}`

            return (
              <EmpireCard
                key={card.id}
                label={card.label}
                sublabel={card.sublabel}
                type={card.type}
                index={index}
                coverImage={card.coverImage}
                accentColor={card.accentColor}
                href={targetPath}
                isExternal={isExternal}
              />
            )
          })}
        </div>
      </main>

      <footer className="py-8 text-center text-[10px] text-gray-600 font-mono uppercase tracking-widest border-t border-white/5">
        POWERED BY PORTUGA EMPIRE © 2026
      </footer>
    </div>
  )
}
