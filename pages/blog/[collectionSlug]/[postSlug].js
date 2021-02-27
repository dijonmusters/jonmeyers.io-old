import blocksToHtml from '@sanity/block-content-to-html'
import { client } from '../../../utils/sanity'

const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
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
      post: {
        ...post,
        html: blocksToHtml({
          blocks: post.body,
        }),
      },
    },
  }
}
