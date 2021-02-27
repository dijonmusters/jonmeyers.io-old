import marked from 'marked'
import { request, gql } from 'graphql-request'
import blocksToHtml from '@sanity/block-content-to-html'
import { client } from '../../../utils/sanity'

const Collection = ({ blog }) => {
  // const html = marked(blog.content)
  console.log(blog)

  return (
    <div>
      <h2>{blog.title}</h2>
      {/* <p>{blog.tags.join(', ')}</p> */}
      <div dangerouslySetInnerHTML={{ __html: blog.html }} />
    </div>
  )
}

export default Blog

const ALL_POSTS_QUERY = gql`
  query {
    allPost {
      slug {
        current
      }
    }
  }
`

export const getStaticPaths = async () => {
  const { allPost } = await request(process.env.SANITY_URL, ALL_POSTS_QUERY)

  const paths = allPost.map(({ slug: { current } }) => ({
    params: {
      slug: current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

const POST_QUERY = gql`
  query($slug: SlugFilter!) {
    allPost(where: { slug: $slug }, limit: 1) {
      title
      bodyRaw
    }
  }
`

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  const variables = {
    slug: {
      current: {
        eq: slug,
      },
    },
  }

  const { allPost } = await request(
    'https://u3w4h9it.api.sanity.io/v1/graphql/production/default',
    POST_QUERY,
    variables
  )

  const [post] = allPost

  const blog = {
    ...post,
    html: blocksToHtml({
      blocks: post.bodyRaw,
    }),
  }

  return {
    props: {
      blog,
    },
  }
}
