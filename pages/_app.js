import styled from 'styled-components'
import { Normalize } from 'styled-normalize'
import ThemeProvider from 'context/Theme'
import DarkModeProvider from 'context/DarkMode'
import { darkTheme, lightTheme } from 'utils/theme'
import Navbar from 'components/Navbar'

const Container = styled.div`
  background: ${(props) => props.theme.background};
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.06rem;
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: ${(props) => props.theme.transition};
`

const Nav = styled(Navbar)`
  flex-grow: 0;
  width: 100%;
`

const Main = styled.main`
  flex: 1;
  width: 100%;
`

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Normalize />
      <DarkModeProvider>
        <ThemeProvider>
          <Container
            lightBackground={lightTheme.background}
            darkBackground={darkTheme.background}
          >
            <Nav />
            <Main>
              <Component {...pageProps} />
            </Main>
          </Container>
        </ThemeProvider>
      </DarkModeProvider>
    </>
  )
}

export default MyApp
