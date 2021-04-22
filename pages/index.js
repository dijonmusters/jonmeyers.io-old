import styled from 'styled-components'
import { md } from 'utils/mediaQueries'
import { client } from 'utils/sanity'
import fs from 'fs'
import { generateRss } from 'utils/rss'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0;
  color: ${(props) => props.theme.highlight};
  transition: ${(props) => props.theme.transition};

  ${md`
    font-size: 4rem;
  `};
`

const Subtitle = styled.p`
  margin-top: 0;

  ${md`
    font-size: 1.5rem;
  `};
`

const HomePage = () => {
  return (
    <Container>
      <Title>This should not render</Title>
      <Subtitle>Broken redirect in next.config.js</Subtitle>
    </Container>
  )
}

const postsQuery = `
  *[_type == 'post' && isPublished == true] {
    title,
    "slug": slug.current,
    title,
    body,
    seoDescription,
    collection->{
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
