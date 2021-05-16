import { client } from 'utils/sanity'
import Container from 'components/Container'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'
import BlockBody from 'components/BlockBody'
import { md } from 'utils/mediaQueries'

const Title = styled.h1`
  margin: 3rem 0;

  ${md`
    font-size: 3rem;
  `}
`

const Article = ({ article }) => {
  const isPartOfSeries = !!article.series
  const breadcrumbTitle = isPartOfSeries ? article.series.title : 'All Articles'
  const breadcrumbSlug = isPartOfSeries
    ? `/series/${article.series.slug}`
    : '/blog'

  return (
    <Container>
      <SEO title={article.title} description={article.seoDescription} />
      <Breadcrumbs title={breadcrumbTitle} slug={breadcrumbSlug} />
      <Title>{article.title}</Title>
      <BlockBody blocks={article.body} />
    </Container>
  )
}

const allSlugsQuery = `
  *[_type=="article" && isPublished == true] {
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

const articleQuery = `
  *[_type == 'article' && slug.current == $slug][0]{
    title,
    body,
    seoDescription,
    series->{
      title,
      "slug": slug.current,
    }
  }
`

export const getStaticProps = async ({ params: { slug } }) => {
  const article = await client.fetch(articleQuery, { slug })

  return {
    props: {
      article,
    },
  }
}

export default Article
