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
`

const Code = styled.div`
  margin: 3rem 0;
`

const Post = ({ post }) => {
  const { isDarkTheme } = useDarkMode()
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
      <SEO title={post.title} description="hi" />
      <Breadcrumbs
        title={post.collection.title}
        slug={post.collection.slug.current}
      />
      <Title>{post.title}</Title>
      <Body blocks={post.body} serializers={serializers} />
    </Container>
  )
}

export default Post

const allSlugsQuery = `
  *[_type=="post"]{
    "slug": slug.current,
  }
`

export const getStaticPaths = async () => {
  const postSlugs = await client.fetch(allSlugsQuery)

  const paths = postSlugs.map(({ slug }) => {
    const [collectionSlug, postSlug] = slug.split('/')

    return {
      params: {
        collectionSlug,
        postSlug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

const postQuery = `
  *[_type == 'post' && slug.current == $slug][0]{
    title,
    body,
    seoDescription,
    collection->{title,slug}
  }
`

export const getStaticProps = async ({ params }) => {
  const { collectionSlug, postSlug } = params

  const variables = {
    slug: `${collectionSlug}/${postSlug}`,
  }

  const post = await client.fetch(postQuery, variables)

  return {
    props: {
      post,
    },
  }
}
