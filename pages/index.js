import styled from 'styled-components'
import { md } from 'utils/mediaQueries'
import { client } from 'utils/sanity'
import fs from 'fs'
import { generateRss } from 'utils/rss'
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

  ${md`
    font-size: 6rem;
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
  `};
`

const Highlight = styled.span`
  color: ${(props) => props.theme.highlight};
`

const Subtitle = styled.p`
  margin-top: 2rem;
  font-size: 2rem;
  text-align: center;

  ${md`
    font-size: 1.5rem;
    text-align: left;
  `};
`

const Words = styled.section`
  flex: 3;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${md`
    flex-direction: row;
  `}
`

const ImgWrapper = styled.div`
  display: none;

  ${md`
    display: flex;
    flex: 1;
    align-items: center;
  `}
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: center;

  ${md`
    display: none;
  `}
`

const MobileImage = styled(Image)`
  border-radius: 50%;
`

const Socials = styled.div`
  display: flex;
  justify-content: center;

  ${md`
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
      <Wrapper>
        <Words>
          <Title>
            Hi, I'm <Highlight>Jon</Highlight>!
          </Title>
          <MobileWrapper>
            <MobileImage
              src="/profile.png"
              alt="Picture of Jon Meyers"
              width={100}
              height={100}
            />
          </MobileWrapper>
          <Subtitle>
            I write{' '}
            <Link href="/blog">
              <Highlight>articles</Highlight>
            </Link>{' '}
            and{' '}
            <Link href="/courses">
              <Highlight>courses</Highlight>
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
          <Image
            src="/profile.png"
            alt="Picture of Jon Meyers"
            width={500}
            height={500}
          />
        </ImgWrapper>
      </Wrapper>
    </Root>
  )
}

const postsQuery = `
  *[_type == 'article' && isPublished == true] | order(positionInSeries, asc) {
    title,
    "slug": slug.current,
    body,
    seoDescription,
    series->{
      title,
    }
  }
`

export const getStaticProps = async () => {
  const posts = await client.fetch(postsQuery)
  const rss = await generateRss(posts)

  fs.writeFileSync('./public/rss.xml', rss)

  console.log('---generated rss feed---')

  return {
    props: {},
  }
}

export default HomePage
