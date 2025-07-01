import { useState, useEffect } from "react"
import axios from "axios"
import type { Product } from "@/types/products"

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await axios.get<Product[]>("/data/products.json")
        const products = response.data
        const foundProduct = products.find((p: Product) => p.slug === slug)
        if (!foundProduct) {
          setError("Product not found")
          return
        }

        setProduct(foundProduct)

        // Filter related products
        const related = products
          .filter((p: Product) => p.id !== slug && !p.tag?.includes("Coming soon") && p.type === foundProduct.type)
          .concat(
            products.filter(
              (p: Product) => p.id !== slug && !p.tag?.includes("Coming soon") && p.type !== foundProduct.type,
            ),
          )

        setRelatedProducts(related)
      } catch (err) {
        setError("Failed to fetch product data")
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  return { product, relatedProducts, loading, error }
}
