import { useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../utils/theme'
import { Context as darkModeContext } from './DarkMode'

const App = ({ children }) => {
  const { theme: currentTheme } = useContext(darkModeContext)
  const theme = currentTheme === 'dark' ? darkTheme : lightTheme

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default App
