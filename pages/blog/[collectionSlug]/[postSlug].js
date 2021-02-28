// import blocksToHtml from '@sanity/block-content-to-html'
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

const Title = styled.h1`
  margin-top: 4rem;
  font-size: 3rem;
`

const Content = styled.div`
  padding: 2rem;
  background: ${(props) => props.theme.paper};
  color: ${(props) => props.theme.ink};

  h2 {
    font-size: 2rem;
  }
`

const Pre = styled.pre`
  background: transparent;
`

const Post = ({ post }) => {
  const { isDarkTheme } = useDarkMode()
  const serializers = {
    types: {
      code: ({ node }) => (
        <SyntaxHighlighter
          language={node.language}
          style={isDarkTheme() ? materialDark : materialLight}
          showLineNumbers
        >
          {node.code}
        </SyntaxHighlighter>
      ),
    },
  }

  return (
    <Container>
      <Title>{post.title}</Title>
      <BlockContent blocks={post.body} serializers={serializers} />
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
    body
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
