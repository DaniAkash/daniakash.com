import React, { useState, useEffect } from "react"
import Switch from "expo-dark-mode-switch"
import { StyleSheet } from "react-native"
import { toggleColorScheme, getCurrentColorMode } from "../../hooks/useColors"
import { ResponsiveView } from "../../LayoutEngine/PrimaryLayout"
import { usePageStateStore } from "../../store/PageState"

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null)
  const { setIsPageLoaded } = usePageStateStore()

  const toggleDarkMode = () => {
    toggleColorScheme()
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const currentMode = getCurrentColorMode()
    setIsPageLoaded(true)
    if (currentMode === "dark") {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
  }, [])

  if (typeof isDarkMode === "boolean") {
    return (
      <ResponsiveView
        desktopStyle={styles.desktopDarkModeToggle}
        mobileStyle={styles.mobileDarkModeToggle}
        tabletStyle={styles.mobileDarkModeToggle}
      >
        <Switch value={isDarkMode} onChange={toggleDarkMode} />
      </ResponsiveView>
    )
  }

  return null
}

const styles = StyleSheet.create({
  desktopDarkModeToggle: {
    position: "absolute",
    top: "1.6rem",
    right: "2rem",
    padding: "1rem",
    transform: [
      {
        scale: 0.5,
      },
    ],
  },
  mobileDarkModeToggle: {
    position: "absolute",
    top: 8,
    right: -4,
    transform: [
      {
        scale: 0.5,
      },
    ],
  },
})

export default DarkModeToggle
