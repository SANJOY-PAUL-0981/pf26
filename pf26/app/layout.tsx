import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Nunito, Patrick_Hand, Gaegu, Geist_Mono, Lacquer, Indie_Flower } from "next/font/google"
import { SmoothScroll } from "@/components/ui/SmoothScroll"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const lacquer = Lacquer({
  variable: "--font-lacquer",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const patrickHand = Patrick_Hand({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const siteUrl = "https://sanjoydev.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Sanjoy Paul - Full-Stack Developer",
    template: "%s | Sanjoy Paul",
  },

  description:
    "Hello! I am Sanjoy Paul, a Computer Science undergraduate and full-stack developer and AI enthusiast building scalable, good-looking products.",

  keywords: [
    "Sanjoy Paul",
    "Sanjoy.dev",
    "sanjoydev",
    "sanjoy.dev",
    "sanjoy paul",
    "Sanj0yx",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "MERN Developer",
    "DevOps",
    "AI ML Enthusiast",
    "Portfolio",
    "Web Development",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
  ],

  authors: [{ name: "Sanjoy Paul", url: siteUrl }],
  creator: "Sanjoy Paul",
  publisher: "Sanjoy Paul",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Sanjoy Paul - Full-Stack Developer",
    description:
      "Hello! I am Sanjoy, a Computer Science undergraduate and full-stack developer and AI enthusiast building scalable, good-looking products.",
    siteName: "Sanjoy.dev",
    images: [
      {
        url: "https://sanjoydev.com/og-img.png",
        width: 1200,
        height: 630,
        alt: "Sanjoy Paul - Full Stack Developer",
      },
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Sanjoy Paul - Full-Stack Developer",
    description:
      "Sanjoy Paul — full-stack developer, CSE undergrad, DevOps and AI/ML enthusiast.",
    images: ["https://sanjoydev.com/og-img.png"],
    creator: "@Sanj0yX",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  category: "technology",
}

export const viewport: Viewport = {
  themeColor: "#fffbf2",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${patrickHand.variable} ${gaegu.variable} ${geistMono.variable} ${lacquer.variable} ${indieFlower.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}