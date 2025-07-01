

import type { Product } from "@/types/products"
import { useState, useEffect } from "react"

type Addon = {
  id: string
  label: string
  price: number
}

const ADDONS: Addon[] = [
  { id: "5h-xp", label: "5 Hours of Double Account XP Codes", price: 6.99 },
  { id: "5h-weapon-xp", label: "5 Hours of Double Account AND Weapon XP Codes", price: 9.99 },
  { id: "10h-xp", label: "10 Hours of Double Account XP Codes", price: 12.99 },
  { id: "10h-weapon-xp", label: "10 Hours of Double Account AND Weapon XP Codes", price: 16.00 },
]

export function usePricing(product: Product | null) {
  const [selectedLobbies, setSelectedLobbies] = useState("")
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [basePrice, setBasePrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const lobbyOptions =
    product?.pricing?.map((pricing, index) => ({
      value: index.toString(),
      label: pricing.quantity,
      price: Number.parseFloat(pricing.price),
    })) || []

  useEffect(() => {
    if (product?.pricing?.length && !selectedLobbies) {
      setSelectedLobbies("0")
      const firstPrice = Number.parseFloat(product.pricing[0].price)
      setBasePrice(firstPrice)
      setTotalPrice(firstPrice)
    }
  }, [product, selectedLobbies])

  useEffect(() => {
    const selectedIndex = Number.parseInt(selectedLobbies)
    const selected = lobbyOptions[selectedIndex]
    const newBasePrice = selected ? selected.price : lobbyOptions[0]?.price || 0

    setBasePrice(newBasePrice)

    const addonTotal = selectedAddons.reduce((total, addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId)
      return total + (addon ? addon.price : 0)
    }, 0)

    setTotalPrice(newBasePrice + addonTotal)
  }, [selectedLobbies, selectedAddons, lobbyOptions])

  const handleAddonChange = (addonId: string, checked: boolean) => {
    if (checked) {
      setSelectedAddons([...selectedAddons, addonId])
    } else {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId))
    }
  }

  return {
    selectedLobbies,
    setSelectedLobbies,
    selectedAddons,
    basePrice,
    totalPrice,
    lobbyOptions,
    addons: ADDONS,
    handleAddonChange,
  }
}
