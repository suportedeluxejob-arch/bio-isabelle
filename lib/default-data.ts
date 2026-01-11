export interface BannerItem {
  id: string
  title: string
  image: string
  link: string
}

export interface MainCard {
  id: string
  type: "PARCERIAS" | "ADULTO" | "SOCIAL" | "LOJA" | "PERSONALIZADO"
  label: string
  sublabel: string
  path: string
  coverImage?: string
  accentColor?: string
}

export interface ProfileData {
  name: string
  photo: string
  bio: string
  instagramLink: string
}

export interface SiteData {
  profile: ProfileData
  mainCards: MainCard[]
  categoryContents: Record<string, BannerItem[]>
}

export const defaultData: SiteData = {
  profile: {
    name: "ISABELLE CALISTAR",
    photo: "/profile-woman-avatar.jpg",
    bio: "Premium Verified Account",
    instagramLink: "https://www.instagram.com/_portugaesteticautomotiva/",
  },
  mainCards: [
    {
      id: "razer",
      type: "PARCERIAS",
      label: "Parcerias & Colabs",
      sublabel: "Marcas e criadores que fazem parte do nosso ecossistema oficial.",
      path: "/niche/razer",
      coverImage: "https://iili.io/fkzOA5g.png",
      accentColor: "#8359f7",
    },
    {
      id: "adulto",
      type: "ADULTO",
      label: "Conteúdo Adulto",
      sublabel: "Plataformas exclusivas e conteúdos privados. Apenas para maiores de 18 anos.",
      path: "/niche/adulto",
      coverImage: "https://iili.io/fkzOA5g.png",
      accentColor: "#ef4444",
    },
    {
      id: "social",
      type: "SOCIAL",
      label: "Redes Sociais",
      sublabel: "Acompanhe nosso dia a dia e conteúdos exclusivos em todas as plataformas.",
      path: "/niche/social",
      coverImage: "https://iili.io/fkzUBzg.png",
      accentColor: "#00d5ff",
    },
    {
      id: "loja",
      type: "LOJA",
      label: "Loja & Achadinhos",
      sublabel: "Meus produtos e minhas recomendações.",
      path: "/niche/loja",
      coverImage: "https://iili.io/fknfcKl.png",
      accentColor: "#f59e0b",
    },
    {
      id: "rifa",
      type: "PERSONALIZADO",
      label: "Rifa da Isa",
      sublabel: "Compre suas cotas por centavos e concorra a prêmios",
      path: "/niche/rifa",
      coverImage: "https://iili.io/fkRzfEl.png",
      accentColor: "#edf042",
    },
    {
      id: "plataforma",
      type: "PERSONALIZADO",
      label: "Plataformas Pagantes",
      sublabel: "Atualizado 2026",
      path: "/niche/plataforma",
      coverImage: "https://iili.io/fko8nvn.png",
      accentColor: "#34d399",
    },
    {
      id: "trader",
      type: "PERSONALIZADO",
      label: "Day Trader / OB",
      sublabel: "Lucro no mercado",
      path: "/niche/trader",
      coverImage: "/trading-stocks-dark.jpg",
      accentColor: "#969696",
    },
  ],
  categoryContents: {
    razer: [
      {
        id: "r1",
        title: "Razer Patrocínio",
        image: "/razer-gaming-green.jpg",
        link: "https://razer.com",
      },
    ],
    adulto: [
      {
        id: "a1",
        title: "Telegram Privado +18",
        image: "https://iili.io/fkoREyG.png",
        link: "https://web.telegram.org/a/#8593129293",
      },
    ],
    social: [
      {
        id: "s1",
        title: "TikTok Oficial",
        image: "/tiktok-social-dark.jpg",
        link: "https://tiktok.com",
      },
      {
        id: "s2",
        title: "Instagram Oficial",
        image: "/instagram-social-gradient.jpg",
        link: "https://www.instagram.com/isa.calistar/",
      },
      {
        id: "s3",
        title: "Facebook Oficial",
        image: "https://iili.io/fkIlTzX.png",
        link: "https://www.facebook.com/isabelle.martinsii.98/",
      },
      {
        id: "s4",
        title: "Youtube Oficial",
        image: "https://iili.io/fkI0QFj.png",
        link: "https://www.youtube.com/@isabelle.calistar",
      },
      {
        id: "s5",
        title: "Threads Oficial",
        image: "https://iili.io/fkwGCvt.md.png",
        link: "https://www.threads.com/@isa.calistar",
      },
    ],
    loja: [
      {
        id: "l1",
        title: "LOJA UseCalistar",
        image: "https://iili.io/fknfcKl.png",
        link: "#",
      },
      {
        id: "l2",
        title: "Achadinhos Shopee",
        image: "https://iili.io/fknALAv.png",
        link: "#",
      },
      {
        id: "l3",
        title: "Meus achadinhos Amazon",
        image: "https://iili.io/fknV87V.md.png",
        link: "#",
      },
      {
        id: "l4",
        title: "Tiktok SHOP - 99% OFF",
        image: "https://iili.io/fkw8Edu.png",
        link: "#",
      },
    ],
    rifa: [],
    plataforma: [],
    trader: [],
  },
}
