"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type SiteData, defaultData } from "@/lib/default-data"
import { subscribeSiteData, saveSiteData, loginAdmin, logoutAdmin, subscribeAuthState } from "@/lib/firebase"

export interface AdminContextType {
  data: SiteData
  siteData: SiteData
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (profile: Partial<SiteData["profile"]>) => void
  addMainCard: (card: Omit<SiteData["mainCards"][0], "id">) => void
  updateMainCard: (id: string, card: Partial<SiteData["mainCards"][0]>) => void
  deleteMainCard: (id: string) => void
  addBanner: (categoryId: string, banner: Omit<SiteData["categoryContents"][string][0], "id">) => void
  updateBanner: (categoryId: string, id: string, banner: Partial<SiteData["categoryContents"][string][0]>) => void
  deleteBanner: (categoryId: string, id: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribeAuth = subscribeAuthState((user: unknown) => {
      setIsAuthenticated(!!user)
      setIsLoading(false)
    })

    return () => unsubscribeAuth()
  }, [])

  useEffect(() => {
    const unsubscribeData = subscribeSiteData((firebaseData: unknown) => {
      if (firebaseData) {
        setData(firebaseData as SiteData)
      } else {
        // Initialize with default data if database is empty
        saveSiteData(defaultData)
        setData(defaultData)
      }
    })

    return () => unsubscribeData()
  }, [])

  const saveData = async (newData: SiteData) => {
    setData(newData)
    await saveSiteData(newData)
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await loginAdmin(email, password)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = async () => {
    await logoutAdmin()
  }

  const updateProfile = (profile: Partial<SiteData["profile"]>) => {
    const updated = { ...data, profile: { ...data.profile, ...profile } }
    saveData(updated)
  }

  const addMainCard = (card: Omit<SiteData["mainCards"][0], "id">) => {
    const id = Date.now().toString()
    const newCard = { ...card, id, path: card.path || `/niche/${id}`, accentColor: card.accentColor || "#8b5cf6" }
    const updated = {
      ...data,
      mainCards: [...data.mainCards, newCard as SiteData["mainCards"][0]],
      categoryContents: { ...data.categoryContents, [id]: [] },
    }
    saveData(updated)
  }

  const updateMainCard = (id: string, card: Partial<SiteData["mainCards"][0]>) => {
    const updated = {
      ...data,
      mainCards: data.mainCards.map((c) => (c.id === id ? { ...c, ...card } : c)),
    }
    saveData(updated)
  }

  const deleteMainCard = (id: string) => {
    const { [id]: removed, ...restContents } = data.categoryContents
    const updated = {
      ...data,
      mainCards: data.mainCards.filter((c) => c.id !== id),
      categoryContents: restContents,
    }
    saveData(updated)
  }

  const addBanner = (categoryId: string, banner: Omit<SiteData["categoryContents"][string][0], "id">) => {
    const newBanner = { ...banner, id: Date.now().toString() }
    const updated = {
      ...data,
      categoryContents: {
        ...data.categoryContents,
        [categoryId]: [...(data.categoryContents[categoryId] || []), newBanner],
      },
    }
    saveData(updated)
  }

  const updateBanner = (categoryId: string, id: string, banner: Partial<SiteData["categoryContents"][string][0]>) => {
    const updated = {
      ...data,
      categoryContents: {
        ...data.categoryContents,
        [categoryId]: (data.categoryContents[categoryId] || []).map((b) => (b.id === id ? { ...b, ...banner } : b)),
      },
    }
    saveData(updated)
  }

  const deleteBanner = (categoryId: string, id: string) => {
    const updated = {
      ...data,
      categoryContents: {
        ...data.categoryContents,
        [categoryId]: (data.categoryContents[categoryId] || []).filter((b) => b.id !== id),
      },
    }
    saveData(updated)
  }

  return (
    <AdminContext.Provider
      value={{
        data,
        siteData: data,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateProfile,
        addMainCard,
        updateMainCard,
        deleteMainCard,
        addBanner,
        updateBanner,
        deleteBanner,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
