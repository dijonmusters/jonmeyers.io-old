import React, { createContext, useState, useEffect } from 'react'

const Context = createContext()

const defaultTheme = 'dark'

const DarkModeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme)

  const setMode = (mode) => {
    localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const isDarkTheme = () => theme === 'dark'

  const toggle = () => setMode(isDarkTheme() ? 'light' : 'dark')

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')

    if (localTheme) {
      setTheme(localTheme)
    } else {
      setMode(defaultTheme)
    }
  }, [])

  const exposed = {
    theme,
    toggle,
    isDarkTheme,
  }

  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export { DarkModeProvider as default, Context }
