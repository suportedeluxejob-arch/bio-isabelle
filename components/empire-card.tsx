"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Lock, Camera, ShoppingBag, Handshake } from "lucide-react"

export interface EmpireCardProps {
  label: string
  sublabel: string
  type: "PARCERIAS" | "ADULTO" | "SOCIAL" | "LOJA" | "PERSONALIZADO"
  index: number
  coverImage?: string
  accentColor?: string
  href: string
  isExternal?: boolean
}

export default function EmpireCard({
  label,
  sublabel,
  type,
  index,
  coverImage,
  accentColor,
  href,
  isExternal,
}: EmpireCardProps) {
  const getBackground = () => {
    if (accentColor && !coverImage) return ""
    switch (type) {
      case "PARCERIAS":
        return "bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950"
      case "ADULTO":
        return "bg-gradient-to-br from-red-950 via-red-900 to-black"
      case "SOCIAL":
        return "bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
      case "LOJA":
        return "bg-gradient-to-br from-yellow-900/40 via-amber-950/40 to-black"
      default:
        return "bg-zinc-900"
    }
  }

  const getIcon = () => {
    const colorStyle = accentColor ? { color: accentColor } : {}
    switch (type) {
      case "PARCERIAS":
        return <Handshake style={colorStyle} size={20} className={!accentColor ? "text-purple-400" : ""} />
      case "ADULTO":
        return <Lock style={colorStyle} size={20} className={!accentColor ? "text-red-500" : ""} />
      case "SOCIAL":
        return <Camera style={colorStyle} size={20} className={!accentColor ? "text-white" : ""} />
      case "LOJA":
        return <ShoppingBag style={colorStyle} size={20} className={!accentColor ? "text-amber-400" : ""} />
      default:
        return <Handshake style={colorStyle} size={20} />
    }
  }

  const CardContent = () => (
    <div
      className={`relative w-full aspect-video overflow-hidden border border-white/10 bg-black ${!coverImage ? getBackground() : ""} shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-500 cursor-pointer rounded-md hover:scale-[1.02] hover:-translate-y-1`}
      style={!coverImage && accentColor ? { backgroundColor: `${accentColor}15`, borderColor: `${accentColor}40` } : {}}
    >
      {coverImage && (
        <>
          <Image src={coverImage || "/placeholder.svg"} alt={label} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </>
      )}

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6">
        <div className="flex justify-between items-start">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/5 rounded-sm flex items-center gap-2">
            {getIcon()}
            <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">{type}</span>
          </div>
          <div className="group-hover:translate-x-1 transition-transform">
            <ChevronRight className="text-white/40" size={24} strokeWidth={1} />
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight leading-none transition-all duration-300 drop-shadow-lg">
            {label}
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 mt-1.5 font-medium drop-shadow-md">{sublabel}</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </div>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md group"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <CardContent />
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="block w-full focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent />
    </Link>
  )
}
