import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { AdminProvider } from "@/contexts/admin-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "ISABELLE CALISTAR | Império de Links",
  description: "Seja bem vindo ao império - Todos os links em um só lugar",
  icons: {
    icon: "/icon.svg",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white selection:bg-purple-500/30`}>
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  )
}
