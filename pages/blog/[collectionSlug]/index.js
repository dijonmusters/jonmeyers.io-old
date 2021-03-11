import { client } from 'utils/sanity'
import Container from 'components/Container'
import Link from 'components/Link'
import styled from 'styled-components'
import { md } from 'utils/mediaQueries'
import SEO from 'components/SEO'

const Title = styled.h1`
  font-size: 3rem;
`

const Description = styled.p`
  line-height: 32px;
  margin: 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 200;
`

const Post = styled.div`
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

const Text = styled.span`
  margin-left: 2.5rem;
`

const Fallback = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
`

const Collection = ({ collection: { title, description, posts } }) => {
  return (
    <Container>
      <SEO title={title} description={description} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      {posts.length > 0 ? (
        posts.map((post, i) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <Post>
              <Num>{i + 1}.</Num>
              <Text>{post.title}</Text>
            </Post>
          </Link>
        ))
      ) : (
        <Fallback>No posts yet!</Fallback>
      )}
    </Container>
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
    description,
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
