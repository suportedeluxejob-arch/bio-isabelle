"use client"

import { useAdmin } from "@/contexts/admin-context"
import EmpireHeader from "@/components/empire-header"
import EmpireCard from "@/components/empire-card"

export default function HomePage() {
  const { data } = useAdmin()
  const cards = data.mainCards

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
