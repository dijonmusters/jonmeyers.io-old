import { FiSun, FiMoon } from 'react-icons/fi'
import styled from 'styled-components'
import useDarkMode from 'hooks/useDarkMode'

const Container = styled.button`
  justify-self: flex-end;
  right: 1rem;
  color: ${(props) => props.theme.color};
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 1rem;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.hover};
  }
`

const DarkModeToggle = ({ className }) => {
  const { isDarkTheme, toggle } = useDarkMode()

  return (
    <Container className={className} onClick={toggle}>
      {isDarkTheme() ? <FiSun /> : <FiMoon />}
    </Container>
  )
}

export default DarkModeToggle
