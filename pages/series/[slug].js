import { client } from 'utils/sanity'
import Container from 'components/Container'
import styled from 'styled-components'
import { md } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'
import NumberedList from 'components/NumberedList'

const Title = styled.h1`
  ${md`
    font-size: 3rem;
  `}
`

const Description = styled.p`
  line-height: 32px;
  margin: 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 200;
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
        <NumberedList items={articles} individualPath="/blog" />
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
