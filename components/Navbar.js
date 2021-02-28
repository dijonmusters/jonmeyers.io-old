import styled from 'styled-components'
import { md } from 'utils/mediaQueries'
import Container from 'components/Container'
import DarkModeToggle from 'components/DarkModeToggle'
import Link from 'next/link'
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
        <Link href="/blog">
          <Anchor>
            <Img src="/dijon-small.png" />
            <TextWrapper>
              <Title>
                Jon Meyers
                <Subtitle>{subtitleMap[path]}</Subtitle>
              </Title>
            </TextWrapper>
          </Anchor>
        </Link>
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

const Anchor = styled.a`
  flex: 1;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
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
  justify-self: flex-end;
`

export default Navbar
