import { client } from 'utils/sanity'
import Container from 'components/Container'
import Link from 'components/Link'
import styled from 'styled-components'
import { md } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'

const Title = styled.h1`
  font-size: 3rem;
`

const Description = styled.p`
  line-height: 32px;
  margin: 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 200;
`

const Article = styled.div`
  position: relative;
  font-size: 1.25rem;
  font-weight: 200;
  padding: 0.5rem 2rem;

  &:hover {
    &::before {
      content: '';
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-color: ${(props) => props.theme.hover};
      pointer-events: none;
    }
  }
`

const Num = styled.span`
  position: absolute;
  left: 2rem;
  font-size: 2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.muted3};
`

const Text = styled.p`
  margin: 0;
  margin-left: 2.5rem;
`

const Fallback = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
`

const Series = ({ series: { title, description, articles } }) => {
  return (
    <Container>
      <SEO title={title} description={description} />
      <Breadcrumbs title="All articles" slug="/blog" />
      <Title>{title}</Title>
      <Description>{description}</Description>
      {articles.length > 0 ? (
        articles.map((article, i) => (
          <Link href={`/blog/${article.slug}`} key={article.slug}>
            <Article>
              <Num>{i + 1}.</Num>
              <Text>{article.title}</Text>
            </Article>
          </Link>
        ))
      ) : (
        <Fallback>No articles yet!</Fallback>
      )}
    </Container>
  )
}

const allSlugsQuery = `
  *[_type=="series" && isPublished == true] {
    "slug": slug.current,
  }
`

export const getStaticPaths = async () => {
  const slugs = await client.fetch(allSlugsQuery)

  const paths = slugs.map(({ slug }) => ({
    params: {
      slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

const seriesQuery = `
  *[_type == 'series' && slug.current == $slug][0]{
    title,
    description,
    "articles": *[_type == 'article' && references(^._id) && isPublished == true] | order(positionInSeries, asc) {
      title,
      "slug": slug.current,
    },
  }
`

export const getStaticProps = async ({ params: { slug } }) => {
  const series = await client.fetch(seriesQuery, { slug })

  return {
    props: {
      series,
    },
  }
}

export default Series
