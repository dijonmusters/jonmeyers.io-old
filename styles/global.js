import { createGlobalStyle } from 'styled-components'

const globalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a, a:visited {
    color: inherit;
  }
`

export default globalStyles
