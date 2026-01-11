"use client"

import Image from "next/image"
import { BadgeCheck } from "lucide-react"

interface EmpireHeaderProps {
  profile: {
    name: string
    photo: string
    bio: string
    instagramLink: string
  }
}

export default function EmpireHeader({ profile }: EmpireHeaderProps) {
  return (
    <header className="w-full max-w-md mx-auto pt-8 pb-6 px-6 flex flex-col items-center z-10">
      {/* Profile Picture with Animated Rings */}
      <a
        href={profile.instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mb-6 group cursor-pointer block"
      >
        {/* Outer Rotating Ring */}
        <div
          className="absolute -inset-3 rounded-full animate-spin"
          style={{
            animationDuration: "4s",
            background: "conic-gradient(from 0deg, #ff00ff, #00ffff, #ffff00, #ff00ff)",
            padding: "3px",
            WebkitMaskImage: "radial-gradient(circle, transparent 60%, black 61%, black 100%)",
            maskImage: "radial-gradient(circle, transparent 60%, black 61%, black 100%)",
          }}
        />

        {/* Counter-rotating Inner Ring */}
        <div
          className="absolute -inset-2 rounded-full opacity-60"
          style={{
            animation: "spin 6s linear infinite reverse",
            background: "conic-gradient(from 180deg, #8b5cf6, #ec4899, #f59e0b, #8b5cf6)",
            padding: "2px",
            WebkitMaskImage: "radial-gradient(circle, transparent 65%, black 66%, black 100%)",
            maskImage: "radial-gradient(circle, transparent 65%, black 66%, black 100%)",
          }}
        />

        {/* Pulsing Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 blur-xl opacity-40 animate-pulse" />

        {/* Profile Picture Container */}
        <div className="relative w-28 h-28 rounded-full border-4 border-black overflow-hidden shadow-2xl shadow-purple-500/40 z-10 transition-transform hover:scale-105">
          <Image
            src={profile.photo || "/placeholder.svg?height=112&width=112"}
            alt={profile.name}
            fill
            className="object-cover"
          />
          {/* Inner Shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Corner Sparkles */}
        <div
          className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full blur-[2px] z-20 animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full blur-[2px] z-20 animate-pulse"
          style={{ animationDuration: "3s", animationDelay: "1.5s" }}
        />
      </a>

      {/* Name with Verified Badge */}
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold text-white tracking-wide uppercase">{profile.name}</h1>

        {/* Verified Badge with Glow */}
        <div className="relative">
          <BadgeCheck className="text-white fill-[#0095f6]" size={20} />
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-40 animate-pulse" />
        </div>
      </div>

      <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gray-500/50 to-transparent mb-2" />

      <p className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em]">{profile.bio}</p>
    </header>
  )
}
