import styled from 'styled-components'
import { sm, lg } from 'utils/mediaQueries'
import Container from 'components/Container'
import DarkModeToggle from 'components/DarkModeToggle'
import Link from 'components/Link'
import { useRouter } from 'next/router'

const navMap = {
  blog: {
    options: ['blog', 'series'],
    subtitle: 'yet another blog',
  },
  videos: {
    options: ['courses', 'lessons', 'videos'],
    subtitle: 'another video tutorial',
  },
}

const Navbar = ({ className, href }) => {
  const router = useRouter()
  const [, path] = router.pathname.split('/')
  const pathConfig =
    navMap[
      Object.keys(navMap).filter((item) => navMap[item].options.includes(path))
    ]

  return (
    <Nav className={className}>
      <Wrapper>
        <LogoLink href="/">
          <Img src="/dijon-small.png" />
          <TextWrapper>
            <Title>
              Jon Meyers
              <Subtitle>{pathConfig?.subtitle || 'Educator'}</Subtitle>
            </Title>
          </TextWrapper>
        </LogoLink>
        <DesktopMenu>
          <Item isActive={pathConfig?.options.includes('blog')}>
            <LinkItem href="/blog">Articles</LinkItem>
          </Item>
          <Item isActive={pathConfig?.options.includes('videos')}>
            <LinkItem href="/videos">Videos</LinkItem>
          </Item>
        </DesktopMenu>
        <DarkmodeButton />
      </Wrapper>
      <MobileMenu>
        <Item isActive={pathConfig?.options.includes('blog')}>
          <LinkItem href="/blog">Articles</LinkItem>
        </Item>
        <Item isActive={pathConfig?.options.includes('videos')}>
          <LinkItem href="/videos">Videos</LinkItem>
        </Item>
      </MobileMenu>
    </Nav>
  )
}

const Nav = styled.nav`
  ${lg`
    border-bottom: 1px solid ${(props) => props.theme.separator};
  `}
`

const Img = styled.img`
  width: 4rem;
  height: 4rem;
`

const Wrapper = styled(Container)`
  padding: 1rem 2rem;
  padding-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${sm`
    padding: 1rem;
    padding-right: 0;
  `}

  ${lg`
    padding-right: 2rem;
  `}
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
  flex: 1;
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

  ${sm`
    font-size: 1.75rem;
  `}

  ${lg`
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

const DesktopMenu = styled.ul`
  display: none;

  ${lg`
    display: flex;
    flex: 1;
    list-style: none;
    justify-content: flex-end;
    padding: 0 1rem;
    margin: 0;
  `}
`

const MobileMenu = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.separator};
  padding: 0;
  padding-bottom: 1rem;
  margin: 0;

  ${lg`
    display: none;
  `}
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
