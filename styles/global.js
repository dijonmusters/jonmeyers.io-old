import { createGlobalStyle } from 'styled-components'

const globalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a, a:visited {
    color: inherit;
  }

  html {
    background: ${(props) => props.theme.background};
  }
`

export default globalStyles
