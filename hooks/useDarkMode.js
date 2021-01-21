import { useContext } from 'react'
import { Context as darkModeContext } from '../context/DarkMode'

const useDarkMode = () => useContext(darkModeContext)

export default useDarkMode
