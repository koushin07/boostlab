import type React from "react"
export interface Products {
  id: string
  title: string
  image: string
  icon?: React.ReactNode
  alt: string
  type: "camo" | "boost" | "service"
  tag?: string
  price: string
  eta?: string
  description: string
  features: string[]
  pricing: {
    quantity: string
    price: string
  }[]
  achievements: string[]
  faq: {
    question: string
    answer: string
    link?: string
  }[]
  howItWorks: {
    step: number
    title: string
    description: string
    link?: string
  }[]
  isNew?: boolean
}
