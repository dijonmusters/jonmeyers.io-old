import { FiSun, FiMoon } from 'react-icons/fi'
import styled from 'styled-components'
import useDarkMode from '../hooks/useDarkMode'

const Container = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  color: ${(props) => props.theme.color};
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`

const DarkModeToggle = () => {
  const { isDarkTheme, toggle } = useDarkMode()

  return (
    <Container onClick={toggle}>
      {isDarkTheme() ? <FiSun /> : <FiMoon />}
    </Container>
  )
}

export default DarkModeToggle
