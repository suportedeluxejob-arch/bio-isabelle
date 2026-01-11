"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAdmin } from "@/contexts/admin-context"
import { LogOut, User, LayoutGrid, Plus, Trash2, Edit2, X, LinkIcon, ExternalLink, Inbox, Palette } from "lucide-react"

export default function AdminPanel() {
  const {
    data,
    isAuthenticated,
    isLoading,
    logout,
    updateProfile,
    addMainCard,
    updateMainCard,
    deleteMainCard,
    addBanner,
    updateBanner,
    deleteBanner,
  } = useAdmin()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("profile")

  // New Banner Form State
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBanner, setNewBanner] = useState({ title: "", image: "", link: "" })

  // New Main Card Form State
  const [showAddMainCard, setShowAddMainCard] = useState(false)
  const [newMainCard, setNewMainCard] = useState({
    label: "",
    sublabel: "",
    path: "",
    coverImage: "",
    type: "PERSONALIZADO" as const,
    accentColor: "#8b5cf6",
  })

  // Edit Banner State
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ title: "", image: "", link: "" })

  // Edit Main Card State
  const [editingMainCardId, setEditingMainCardId] = useState<string | null>(null)
  const [editMainCardForm, setEditMainCardForm] = useState({
    label: "",
    sublabel: "",
    path: "",
    coverImage: "",
    type: "PERSONALIZADO" as const,
    accentColor: "#8b5cf6",
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin")
    }
  }, [isAuthenticated, isLoading, router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleAddBanner = (categoryId: string) => {
    if (!newBanner.title || !newBanner.image || !newBanner.link) return
    addBanner(categoryId, newBanner)
    setNewBanner({ title: "", image: "", link: "" })
    setShowAddForm(false)
  }

  const handleAddMainCard = () => {
    if (!newMainCard.label) return
    addMainCard(newMainCard)
    setNewMainCard({
      label: "",
      sublabel: "",
      path: "",
      coverImage: "",
      type: "PERSONALIZADO",
      accentColor: "#8b5cf6",
    })
    setShowAddMainCard(false)
  }

  const startEditing = (banner: { id: string; title: string; image: string; link: string }) => {
    setEditingBannerId(banner.id)
    setEditForm({ title: banner.title, image: banner.image, link: banner.link })
  }

  const startEditingMainCard = (card: (typeof data.mainCards)[0]) => {
    setEditingMainCardId(card.id)
    setEditMainCardForm({
      label: card.label,
      sublabel: card.sublabel,
      path: card.path,
      coverImage: card.coverImage || "",
      type: card.type,
      accentColor: card.accentColor || "#8b5cf6",
    })
  }

  const saveEdit = (categoryId: string) => {
    if (editingBannerId) {
      updateBanner(categoryId, editingBannerId, editForm)
      setEditingBannerId(null)
    }
  }

  const saveMainCardEdit = () => {
    if (editingMainCardId) {
      updateMainCard(editingMainCardId, editMainCardForm)
      setEditingMainCardId(null)
    }
  }

  // Static Tabs
  const staticTabs = [
    { id: "profile", name: "Perfil", icon: User },
    { id: "cards", name: "Temas (Home)", icon: LayoutGrid },
  ]

  // Dynamic Tabs based on Main Cards
  const dynamicTabs = data.mainCards.map((card) => ({
    id: `niche-${card.id}`,
    name: card.label,
    icon: Inbox,
    categoryId: card.id,
  }))

  const allTabs = [...staticTabs, ...dynamicTabs]

  const renderBannerManager = (categoryId: string, categoryName: string) => {
    const banners = data.categoryContents[categoryId] || []
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Conteúdo: {categoryName}</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm text-white"
          >
            {showAddForm ? <X size={16} /> : <Plus size={16} />}
            {showAddForm ? "Cancelar" : "Adicionar Banner"}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="p-4 bg-zinc-800 border border-purple-500/30 rounded-lg space-y-3 mb-6">
            <h3 className="text-sm font-bold text-purple-400">Novo Banner para {categoryName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                placeholder="Título"
                value={newBanner.title}
                onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                className="bg-black border border-white/10 p-2 rounded text-sm outline-none focus:border-purple-500 text-white"
              />
              <input
                placeholder="URL da Imagem"
                value={newBanner.image}
                onChange={(e) => setNewBanner({ ...newBanner, image: e.target.value })}
                className="bg-black border border-white/10 p-2 rounded text-sm outline-none focus:border-purple-500 text-white"
              />
              <input
                placeholder="URL do Link"
                value={newBanner.link}
                onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                className="bg-black border border-white/10 p-2 rounded text-sm outline-none focus:border-purple-500 text-white"
              />
            </div>
            <button
              onClick={() => handleAddBanner(categoryId)}
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-bold transition-colors text-white"
            >
              Salvar Novo Banner
            </button>
          </div>
        )}

        {/* Banners List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-zinc-800 border border-white/5 rounded-lg overflow-hidden group">
              <div className="aspect-video relative">
                <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => startEditing(banner)}
                    className="p-2 bg-blue-600 rounded-full hover:scale-110 transition-transform"
                  >
                    <Edit2 size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => deleteBanner(categoryId, banner.id)}
                    className="p-2 bg-red-600 rounded-full hover:scale-110 transition-transform"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              </div>

              <div className="p-3">
                {editingBannerId === banner.id ? (
                  <div className="space-y-2">
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-black border border-white/20 p-1 rounded text-xs text-white"
                    />
                    <input
                      value={editForm.image}
                      onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                      className="w-full bg-black border border-white/20 p-1 rounded text-xs text-white"
                    />
                    <input
                      value={editForm.link}
                      onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                      className="w-full bg-black border border-white/20 p-1 rounded text-xs text-white"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(categoryId)}
                        className="flex-1 py-1 bg-green-600 rounded text-[10px] font-bold text-white"
                      >
                        SALVAR
                      </button>
                      <button
                        onClick={() => setEditingBannerId(null)}
                        className="flex-1 py-1 bg-zinc-700 rounded text-[10px] font-bold text-white"
                      >
                        CANCELAR
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="font-bold text-sm truncate text-white">{banner.title}</h4>
                    <p className="text-[10px] text-gray-500 truncate flex items-center gap-1 mt-1">
                      <LinkIcon size={10} /> {banner.link}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
          {banners.length === 0 && !showAddForm && (
            <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-lg">
              <p className="text-gray-500 text-sm">Nenhum banner cadastrado neste tema.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-purple-600/30 border-t-purple-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="bg-zinc-900 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Painel Administrativo</h1>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
              rel="noreferrer"
            >
              <ExternalLink size={16} />
              Ver Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-600">
          {allTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setShowAddForm(false)
                  setShowAddMainCard(false)
                  setEditingBannerId(null)
                  setEditingMainCardId(null)
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? "bg-purple-600 text-white" : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                }`}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            )
          })}
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-lg p-6">
          {activeTab === "profile" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome</label>
                <input
                  type="text"
                  value={data.profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">URL da Foto de Perfil</label>
                <input
                  type="text"
                  value={data.profile.photo}
                  onChange={(e) => updateProfile({ photo: e.target.value })}
                  placeholder="/profile.jpg ou https://..."
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Link Instagram</label>
                <input
                  type="text"
                  value={data.profile.instagramLink}
                  onChange={(e) => updateProfile({ instagramLink: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Bio</label>
                <input
                  type="text"
                  value={data.profile.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <p className="text-green-500 text-sm">Salvo automaticamente no Firebase</p>
            </div>
          )}

          {activeTab === "cards" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gerenciar Temas (Página Inicial)</h2>
                <button
                  onClick={() => setShowAddMainCard(!showAddMainCard)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm"
                >
                  {showAddMainCard ? <X size={16} /> : <Plus size={16} />}
                  {showAddMainCard ? "Cancelar" : "Criar Novo Tema"}
                </button>
              </div>

              {/* Add Main Card Form */}
              {showAddMainCard && (
                <div className="p-4 bg-zinc-800 border border-purple-500/30 rounded-lg space-y-3 mb-6">
                  <h3 className="text-sm font-bold text-purple-400">Novo Tema para a Home</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      placeholder="Título do Tema (ex: Esportes)"
                      value={newMainCard.label}
                      onChange={(e) => setNewMainCard({ ...newMainCard, label: e.target.value })}
                      className="bg-black border border-white/10 p-2 rounded text-sm outline-none focus:border-purple-500 text-white"
                    />
                    <input
                      placeholder="Subtítulo (ex: Nacionais e Importados)"
                      value={newMainCard.sublabel}
                      onChange={(e) => setNewMainCard({ ...newMainCard, sublabel: e.target.value })}
                      className="bg-black border border-white/10 p-2 rounded text-sm outline-none focus:border-purple-500 text-white"
                    />
                    <input
                      placeholder="URL da Capa"
                      value={newMainCard.coverImage}
                      onChange={(e) => setNewMainCard({ ...newMainCard, coverImage: e.target.value })}
                      className="bg-black border border-white/10 p-2 rounded text-sm outline-none focus:border-purple-500 text-white"
                    />
                    <input
                      placeholder="Link Externo (opcional - ex: https://wa.me/...)"
                      value={newMainCard.path}
                      onChange={(e) => setNewMainCard({ ...newMainCard, path: e.target.value })}
                      className="bg-black border border-white/10 p-2 rounded text-sm outline-none focus:border-purple-500 text-white"
                    />
                    <div className="flex items-center gap-3 bg-black/50 p-2 rounded border border-white/10">
                      <Palette size={16} className="text-gray-400" />
                      <input
                        type="color"
                        value={newMainCard.accentColor}
                        onChange={(e) => setNewMainCard({ ...newMainCard, accentColor: e.target.value })}
                        className="w-8 h-8 bg-transparent border-none cursor-pointer"
                      />
                      <span className="text-xs text-gray-400">Cor de Destaque</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    * O link será gerado automaticamente como uma página interna.
                  </p>
                  <button
                    onClick={handleAddMainCard}
                    className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-bold transition-colors"
                  >
                    Salvar Novo Tema
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {data.mainCards.map((card) => (
                  <div key={card.id} className="bg-zinc-800 p-4 rounded-lg border border-white/5 group">
                    {editingMainCardId === card.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Título</label>
                            <input
                              value={editMainCardForm.label}
                              onChange={(e) => setEditMainCardForm({ ...editMainCardForm, label: e.target.value })}
                              className="w-full bg-black border border-white/20 p-2 rounded text-sm text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Subtítulo</label>
                            <input
                              value={editMainCardForm.sublabel}
                              onChange={(e) => setEditMainCardForm({ ...editMainCardForm, sublabel: e.target.value })}
                              className="w-full bg-black border border-white/20 p-2 rounded text-sm text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Link</label>
                            <input
                              value={editMainCardForm.path}
                              onChange={(e) => setEditMainCardForm({ ...editMainCardForm, path: e.target.value })}
                              className="w-full bg-black border border-white/20 p-2 rounded text-sm text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">URL da Capa</label>
                            <input
                              value={editMainCardForm.coverImage}
                              onChange={(e) => setEditMainCardForm({ ...editMainCardForm, coverImage: e.target.value })}
                              className="w-full bg-black border border-white/20 p-2 rounded text-sm text-white"
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <Palette size={16} className="text-gray-400" />
                            <input
                              type="color"
                              value={editMainCardForm.accentColor}
                              onChange={(e) =>
                                setEditMainCardForm({ ...editMainCardForm, accentColor: e.target.value })
                              }
                              className="w-8 h-8 bg-transparent border-none cursor-pointer"
                            />
                            <span className="text-xs text-gray-400">Cor de Destaque</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={saveMainCardEdit}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-white"
                          >
                            SALVAR
                          </button>
                          <button
                            onClick={() => setEditingMainCardId(null)}
                            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm font-bold text-white"
                          >
                            CANCELAR
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {card.coverImage && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                              <Image
                                src={card.coverImage || "/placeholder.svg"}
                                alt={card.label}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-white">{card.label}</h4>
                            <p className="text-xs text-gray-500">{card.sublabel}</p>
                            <p className="text-[10px] text-gray-600 mt-1">{card.path}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEditingMainCard(card)}
                            className="p-2 bg-blue-600 rounded-full hover:scale-110 transition-transform"
                          >
                            <Edit2 size={14} className="text-white" />
                          </button>
                          <button
                            onClick={() => deleteMainCard(card.id)}
                            className="p-2 bg-red-600 rounded-full hover:scale-110 transition-transform"
                          >
                            <Trash2 size={14} className="text-white" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic category tabs */}
          {dynamicTabs.map((tab) => {
            if (activeTab === tab.id && tab.categoryId) {
              return <div key={tab.id}>{renderBannerManager(tab.categoryId, tab.name)}</div>
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
