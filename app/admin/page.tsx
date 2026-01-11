"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import { Crown, Lock, Eye, EyeOff, Mail } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login, isAuthenticated, isLoading } = useAdmin()

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/panel")
    }
  }, [isAuthenticated, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const success = await login(email, password)

    if (success) {
      router.push("/admin/panel")
    } else {
      setError("Credenciais incorretas. Verifique seu email e senha.")
    }
    setLoading(false)
  }

  if (isLoading) {
    return (
      <div className="empire-bg min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="empire-bg min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full empire-border-strong flex items-center justify-center bg-black/50 animate-pulse-gold">
            <Crown className="w-10 h-10 text-[#d4af37]" fill="#d4af37" />
          </div>
          <h1 className="text-2xl font-bold empire-gold-gradient">Painel Imperial</h1>
          <p className="text-gray-500 text-sm mt-2">Área restrita para administradores</p>
        </div>

        {/* Login Form */}
        <div className="admin-card">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="Digite seu email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input pr-12"
                  placeholder="Digite a senha imperial"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#d4af37]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full empire-btn py-4 rounded-xl font-bold disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Verificando...
                </span>
              ) : (
                "Entrar no Painel"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <button
              onClick={() => router.push("/")}
              className="w-full text-gray-500 hover:text-[#d4af37] text-sm transition-colors"
            >
              ← Voltar para o site
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">Acesso protegido pelo Firebase</p>
      </div>
    </div>
  )
}
