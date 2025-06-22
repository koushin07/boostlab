
import { useEffect, useRef } from "react"

export function useSectionRef(sectionsRef: React.RefObject<HTMLElement[]>, index: number) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current && sectionsRef.current) {
      sectionsRef.current[index] = sectionRef.current
    }
  }, [sectionsRef, index])

  return sectionRef
}
