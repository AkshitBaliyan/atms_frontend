"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps extends React.PropsWithChildren {}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

function useTheme() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system")

  return {
    theme,
    setTheme,
  }
}

export { ThemeProvider, useTheme }

