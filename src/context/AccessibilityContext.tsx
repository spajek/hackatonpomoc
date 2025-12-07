'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface AccessibilityContextType {
  highContrast: boolean
  toggleHighContrast: () => void
  fontSizePercent: number
  increaseFont: () => void
  decreaseFont: () => void
  resetAccessibility: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedContrast = localStorage.getItem('high-contrast')
      return storedContrast === 'true'
    }
    return false
  })

  const [fontSizePercent, setFontSizePercent] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedFontSize = localStorage.getItem('font-size-percent')
      return storedFontSize ? parseInt(storedFontSize, 10) : 100
    }
    return 100
  })

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const html = document.documentElement

      if (highContrast) {
        html.setAttribute('data-high-contrast', 'true')
        localStorage.setItem('high-contrast', 'true')
        // Force a re-render by adding/removing a class
        document.body.classList.add('high-contrast-active')
      } else {
        html.removeAttribute('data-high-contrast')
        localStorage.setItem('high-contrast', 'false')
        document.body.classList.remove('high-contrast-active')
      }

      html.style.fontSize = `${fontSizePercent}%`
      localStorage.setItem('font-size-percent', fontSizePercent.toString())
    }
  }, [highContrast, fontSizePercent])

  const toggleHighContrast = () => setHighContrast((prev) => !prev)

  const increaseFont = () => {
    setFontSizePercent((prev) => Math.min(prev + 10, 150))
  }

  const decreaseFont = () => {
    setFontSizePercent((prev) => Math.max(prev - 10, 80))
  }

  const resetAccessibility = () => {
    setHighContrast(false)
    setFontSizePercent(100)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSizePercent,
        increaseFont,
        decreaseFont,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
