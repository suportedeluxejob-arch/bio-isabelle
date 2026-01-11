"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { useState } from "react"

interface VisualBannerProps {
  image: string
  title: string
  link: string
  index?: number
  accentColor?: string
}

export default function VisualBanner({ image, title, link, index = 0, accentColor = "#8b5cf6" }: VisualBannerProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative w-full aspect-video rounded-lg overflow-hidden border border-white/20 group hover:border-white/60 transition-all duration-300 shadow-lg hover:scale-[1.03] hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Skeleton Loader */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 animate-pulse" />
      )}

      {/* Banner Image */}
      <Image
        src={imageError ? `/placeholder.svg?height=450&width=800&query=${encodeURIComponent(title)}` : image}
        alt={title}
        fill
        className={`object-cover transition-all duration-700 ${
          imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } group-hover:scale-110`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-lg group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>
        <div className="transition-transform hover:rotate-45 hover:scale-110">
          <ExternalLink
            style={{ color: accentColor }}
            className="opacity-80 group-hover:opacity-100 transition-opacity"
            size={20}
          />
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </a>
  )
}
