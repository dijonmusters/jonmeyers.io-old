import BlockContent from '@sanity/block-content-to-react'
import { client } from 'utils/sanity'
import Container from 'components/Container'
import styled from 'styled-components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
  materialLight,
} from 'node_modules/react-syntax-highlighter/dist/esm/styles/prism'
import { nightOwl } from 'node_modules/react-syntax-highlighter/dist/esm/styles/hljs'
import useDarkMode from 'hooks/useDarkMode'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'

const Title = styled.h1`
  margin: 3rem 0;
  font-size: 3rem;
`

const Pre = styled.pre`
  background: transparent;
`

const Body = styled(BlockContent)`
  p {
    line-height: 32px;
    margin: 1.5rem 0;
    font-size: 1.25rem;
    font-weight: 200;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 0;
  }

  pre {
    margin: 3rem 0;
  }

  blockquote {
    margin: 3rem 0;
    padding: 2rem;
    background-color: ${(props) => props.theme.offBackground2};
    color: ${(props) => props.theme.muted};
    font-style: italic;
    border-left: 5px solid ${(props) => props.theme.highlight};
  }

  a {
    color: ${(props) => props.theme.highlight};
  }

  li {
    line-height: 32px;
    font-weight: 200;
  }

  figure {
    margin: 3rem 0;
  }

  img {
    width: 100%;
  }
`

const Code = styled.div`
  margin: 3rem 0;
`

const Article = ({ article }) => {
  const { isDarkTheme } = useDarkMode()
  const isPartOfSeries = !!article.series
  const breadcrumbTitle = isPartOfSeries ? article.series.title : 'All Articles'
  const breadcrumbSlug = isPartOfSeries
    ? `/series/${article.series.slug}`
    : '/blog'

  const serializers = {
    types: {
      code: ({ node }) => (
        <Code>
          <SyntaxHighlighter
            language={node.language}
            style={isDarkTheme() ? materialDark : materialLight}
            showLineNumbers
          >
            {node.code}
          </SyntaxHighlighter>
        </Code>
      ),
    },
  }

  return (
    <Container>
      <SEO title={article.title} description={article.seoDescription} />
      <Breadcrumbs title={breadcrumbTitle} slug={breadcrumbSlug} />
      <Title>{article.title}</Title>
      <Body
        blocks={article.body}
        serializers={serializers}
        imageOptions={{ w: 800, fit: 'max' }}
        projectId="u3w4h9it"
        dataset="production"
      />
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
