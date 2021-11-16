import styled from 'styled-components'
import { lg } from 'utils/mediaQueries'
import Container from 'components/Container'
import Image from 'next/image'
import { FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa'
import Link from 'components/Link'

const Root = styled(Container)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  font-size: 5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.color};
  transition: ${(props) => props.theme.transition};
  text-align: center;

  ${lg`
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
  `};
`

const Highlight = styled.span`
  color: ${(props) => props.theme.highlight};
`

const OppositeHighlight = styled.span`
  color: ${(props) => props.theme.gradientHighlightRight};
`

const Subtitle = styled.p`
  margin-top: 2rem;
  font-size: 2rem;
  text-align: center;

  ${lg`
    font-size: 1.5rem;
    text-align: left;
  `};
`

const Words = styled.section`
  flex: 3;
`

const GradientWrapper = styled.div`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: -0.5rem;
    top: -0.5rem;
    width: calc(100% + 1rem);
    height: calc(100% + 1rem);
    background-image: ${(props) => props.theme.gradient};
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${(props) => props.theme.background};
  padding: 2rem;

  ${lg`
    flex-direction: row;
  `}
`

const ImgWrapper = styled.div`
  display: none;

  ${lg`
    display: flex;
    flex: 1;
    align-items: center;
  `}
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: center;

  ${lg`
    display: none;
  `}
`

const RoundedImage = styled(Image)`
  border-radius: 50%;
`

const Socials = styled.div`
  display: flex;
  justify-content: center;

  ${lg`
    justify-content: flex-start;
  `}
`

const Icon = styled.a`
  font-size: 3rem;
  color: ${(props) => props.theme.color};

  & + & {
    margin-left: 2rem;
  }
`

const HomePage = () => {
  return (
    <Root>
      <GradientWrapper>
        <Wrapper>
          <Words>
            <Title>
              Hi, I'm <Highlight>Jon</Highlight>!
            </Title>
            <MobileWrapper>
              <RoundedImage
                src="/profile.png"
                alt="Picture of Jon Meyers"
                width={100}
                height={100}
              />
            </MobileWrapper>
            <Subtitle>
              I write{' '}
              <Link href="/blog">
                <OppositeHighlight>articles</OppositeHighlight>
              </Link>{' '}
              and{' '}
              <Link href="/courses">
                <OppositeHighlight>courses</OppositeHighlight>
              </Link>{' '}
              about web development.
            </Subtitle>
            <Socials>
              <Icon href="https://twitter.com/_dijonmusters">
                <FaTwitter />
              </Icon>
              <Icon href="https://www.youtube.com/channel/UCPitAIwktfCfcMR4kDWebDQ">
                <FaYoutube />
              </Icon>
              <Icon href="https://github.com/dijonmusters">
                <FaGithub />
              </Icon>
            </Socials>
          </Words>
          <ImgWrapper>
            <RoundedImage
              src="/profile.png"
              alt="Picture of Jon Meyers"
              width={500}
              height={500}
            />
          </ImgWrapper>
        </Wrapper>
      </GradientWrapper>
    </Root>
  )
}

export default HomePage
