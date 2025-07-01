/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Product } from "@/types/products"
import { renderTextWithBold } from "@/utils/TextFormatter"
import { ChevronDown } from "lucide-react"

import type React from "react" // Import React to declare JSX.Element

interface FAQSectionProps {
  product: Product
}

function renderFAQAnswer(faqItem: any) {
  const { answer, link } = faqItem
  const lines = answer.split("\n").filter((line: string) => line.trim() !== "")

  const renderLine = (line: string, index: number) => {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith("-")) {
      const listContent = trimmedLine.substring(1).trim()
      return (
        <li key={index} className="ml-4">
          {renderTextWithBold(listContent)}
        </li>
      )
    }

    return (
      <p key={index} className={index > 0 ? "mt-2" : ""}>
        {renderTextWithBold(trimmedLine)}
      </p>
    )
  }

  const renderContent = () => {
    const elements: React.JSX.Element[] = [] // Declare JSX.Element with React namespace
    let currentList: React.JSX.Element[] = []
    let listStartIndex = -1

    lines.forEach((line: string, index: number) => {
      const trimmedLine = line.trim()

      if (trimmedLine.startsWith("-")) {
        if (currentList.length === 0) {
          listStartIndex = index
        }
        currentList.push(renderLine(line, index))
      } else {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${listStartIndex}`} className="list-disc list-inside space-y-1 mt-2">
              {currentList}
            </ul>,
          )
          currentList = []
          listStartIndex = -1
        }
        elements.push(renderLine(line, index))
      }
    })

    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listStartIndex}`} className="list-disc list-inside space-y-1 mt-2">
          {currentList}
        </ul>,
      )
    }

    return elements
  }

  const handleDiscordLinks = (content: React.JSX.Element[]) => {
    if (!link) return content

    return content.map((element, index) => {
      if (element.type === "p" && element.props.children) {
        const children = element.props.children

        if (typeof children === "string" && children.includes("Discord Server")) {
          const parts = children.split("Discord Server")
          return (
            <p key={index} className={element.props.className}>
              {renderTextWithBold(parts[0])}
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-secondary underline">
                Discord Server
              </a>
              {parts[1] && renderTextWithBold(parts[1])}
            </p>
          )
        } else if (Array.isArray(children)) {
          const newChildren = children.map((child, childIndex) => {
            if (typeof child === "string" && child.includes("Discord Server")) {
              const parts = child.split("Discord Server")
              return (
                <span key={childIndex}>
                  {parts[0]}
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-secondary underline">
                    Discord Server
                  </a>
                  {parts[1]}
                </span>
              )
            }
            return child
          })

          return (
            <p key={index} className={element.props.className}>
              {newChildren}
            </p>
          )
        }
      }
      return element
    })
  }

  const content = renderContent()
  const finalContent = handleDiscordLinks(content)

  return (
    <div className="p-3 pt-2 pl-4">
      <div className="font-supporting text-muted-foreground text-sm">{finalContent}</div>
    </div>
  )
}

export function FAQSection({ product }: FAQSectionProps) {
  if (!product.faq?.length) return null

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6">
      <h2 className="text-xl font-primary text-white mb-4">FAQ</h2>
      <div className="space-y-3">
        {product.faq.map((faqItem, index) => (
          <details key={index} className="group bg-muted/10 rounded-lg hover:bg-muted/20">
            <summary className="flex items-center justify-between cursor-pointer p-3 transition-colors">
              <span className="font-supporting text-white text-sm">{faqItem.question}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
            </summary>
            {renderFAQAnswer(faqItem)}
          </details>
        ))}
      </div>
    </div>
  )
}
