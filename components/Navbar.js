import styled from 'styled-components'
import { md } from 'utils/mediaQueries'
import Container from 'components/Container'
import DarkModeToggle from 'components/DarkModeToggle'
import Link from 'components/link'
import { useRouter } from 'next/router'

const subtitleMap = {
  blog: 'yet another blog',
  courses: 'even more courses',
}

const Navbar = ({ className, href }) => {
  const router = useRouter()
  const [, path] = router.pathname.split('/')

  return (
    <Nav className={className}>
      <Wrapper>
        <LogoLink href="/blog">
          <Img src="/dijon-small.png" />
          <TextWrapper>
            <Title>
              Jon Meyers
              <Subtitle>{subtitleMap[path]}</Subtitle>
            </Title>
          </TextWrapper>
        </LogoLink>
        <Items>
          <Item isActive={router.pathname === '/blog'}>
            <LinkItem href="/blog">Articles</LinkItem>
          </Item>
          <Item isActive={router.pathname === '/courses'}>
            <LinkItem href="/courses">Courses</LinkItem>
          </Item>
        </Items>
        <DarkModeToggle />
      </Wrapper>
    </Nav>
  )
}

const Nav = styled.nav`
  border-bottom: 1px solid ${(props) => props.theme.separator};
`

const Img = styled.img`
  width: 4rem;
  height: 4rem;
`

const Wrapper = styled(Container)`
  padding: 1rem;
  display: flex;
  align-items: center;
`

const LinkItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;

  &:hover {
    cursor: pointer;
  }
`

const LogoLink = styled(LinkItem)`
  padding: 0;
`

const TextWrapper = styled.div`
  flex: 1;
`

const Title = styled.h1`
  position: relative;
  width: fit-content;
  font-size: 2rem;
  color: ${(props) => props.theme.highlight};
  transition: ${(props) => props.theme.transition};

  ${md`
    font-size: 2rem;
  `};
`

const Subtitle = styled.span`
  position: absolute;
  right: 0.25rem;
  bottom: -1rem;
  font-size: 1rem;
  color: ${(props) => props.theme.color};
  font-weight: 200;
`

const DarkmodeButton = styled(DarkModeToggle)`
  flex: 0;
`

const Items = styled.ul`
  flex: 1;
  display: flex;
  list-style: none;
  justify-content: flex-end;
  padding: 0 1rem;
  margin: 0;
`

const Item = styled.li`
  padding: 0;
  font-size: 1.25rem;
  margin: 0;

  & + & {
    margin-left: 0.25rem;
  }

  &:hover {
    background: ${(props) => props.theme.hover};
    cursor: pointer;
    text-decoration: underline;
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
      background: ${theme.hover};
    `}
`

export default Navbar
