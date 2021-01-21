import styled from 'styled-components'
import { Normalize } from 'styled-normalize'
import ThemeProvider from '../context/Theme'
import DarkModeProvider from '../context/DarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import { darkTheme, lightTheme } from '../utils/theme'

const Container = styled.div`
  position: relative;
  background-size: 100%;
  background-image: ${(props) => props.lightBackground};
  font-family: 'Open Sans', sans-serif;
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &::before {
    background-image: ${(props) => props.darkBackground};
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${(props) => (props.theme.isDarkMode ? 1 : 0)};
    width: 100%;
    z-index: -1;
    transition: ${(props) => props.theme.transition};
  }
`

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Normalize />
      <DarkModeProvider>
        <ThemeProvider>
          {/* TODO! Add a darkmode switchable favicon */}
          <Container
            lightBackground={lightTheme.background}
            darkBackground={darkTheme.background}
          >
            <DarkModeToggle />
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </DarkModeProvider>
    </>
  )
}

export default MyApp
