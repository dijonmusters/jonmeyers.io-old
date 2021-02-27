import { client } from '../../../utils/sanity'

const Collection = ({ collection: { title, posts } }) => {
  return (
    <div>
      <h2>{title}</h2>
      {posts.map((post) => (
        <p>{post.title}</p>
      ))}
    </div>
  )
}

export default Collection

const allSlugsQuery = `
  *[_type=="collection"]{
    "slug": slug.current,
  }
`

export const getStaticPaths = async () => {
  const collectionSlugs = await client.fetch(allSlugsQuery)

  const paths = collectionSlugs.map(({ slug }) => ({
    params: {
      collectionSlug: slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

const collectionQuery = `
  *[_type == 'collection' && slug.current == $slug][0]{
    title,
    "posts": *[_type == 'post' && references(^._id)]{
      title,
      "slug": slug.current,
    },
  }
`

export const getStaticProps = async ({ params }) => {
  const { collectionSlug } = params

  const variables = {
    slug: collectionSlug,
  }

  const collection = await client.fetch(collectionQuery, variables)

  return {
    props: {
      collection,
    },
  }
}
