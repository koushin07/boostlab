import type { ReactNode } from "react"

export function renderTextWithBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-accent">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}
