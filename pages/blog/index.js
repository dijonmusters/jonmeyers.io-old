import styled from 'styled-components'
import Container from 'components/Container'
import { md } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import { client } from 'utils/sanity'
import Link from 'components/Link'
import { useRouter } from 'next/router'
import { IoIosArrowRoundForward } from 'react-icons/io'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 2rem;
  margin-top: 2rem;

  ${md`
    margin-top: 4rem;
  `};
`

const Blog = styled.div`
  position: relative;
  font-size: 1.25rem;
  font-weight: 200;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  ${md`
    font-size: 1.5rem;
    padding: 1rem;
  `};

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

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;

  ${md`
    font-size: 2rem;
  `};

  &:hover {
    cursor: pointer;
  }
`

const ConnectedBullets = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Bullet = styled.li`
  position: relative;
  padding-left: 1.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.muted2};

  &:hover {
    cursor: pointer;
  }

  ${md`
    font-size: 1rem;
  `};

  &:before {
    background-color: ${(props) => props.theme.separator};
    width: 1px;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.5rem;
  }

  &:last-child:before {
    height: 52%;
  }

  &:after {
    width: 0.5rem;
    border-bottom: solid 1px ${(props) => props.theme.separator};
    content: '';
    position: absolute;
    left: calc(0.5rem + 1px);
    top: 50%;
    transform: translateY(-50%);
  }
`

const HoverLink = styled.a`
  z-index: 1;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.color};
  }
`

const Arrow = styled(IoIosArrowRoundForward)`
  font-size: 1.5rem;
`

const Centered = styled(Title)`
  text-align: center;
`

const BlogList = ({ collections }) => {
  const router = useRouter()

  const handleNavigation = (slug) => (e) => {
    e.stopPropagation()
    e.preventDefault()
    router.push(slug)
  }

  return (
    <Container>
      <SEO
        title="Yet another blog"
        description="A collection of developer-focused, practical, web development blog posts written by Jon Meyers."
      />
      <List>
        {collections.length > 0 ? (
          collections.map(({ slug, title, posts, numberOfPosts }) => (
            <Blog
              key={`/blog/${slug}`}
              onClick={handleNavigation(`/blog/${slug}`)}
            >
              <Title>{title}</Title>
              <ConnectedBullets>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <Bullet key={post.slug}>
                      <HoverLink
                        onClick={handleNavigation(`/blog/${post.slug}`)}
                      >
                        {post.title}
                      </HoverLink>
                    </Bullet>
                  ))
                ) : (
                  <Bullet>No posts yet</Bullet>
                )}
                {numberOfPosts > 3 && (
                  <Bullet>
                    <HoverLink onClick={handleNavigation(`/blog/${slug}`)}>
                      {numberOfPosts - 3} more <Arrow />
                    </HoverLink>
                  </Bullet>
                )}
              </ConnectedBullets>
            </Blog>
          ))
        ) : (
          <Centered>No blog posts!</Centered>
        )}
      </List>
    </Container>
  )
}

const query = `
  *[_type == "collection" && isPublished == true]{
    title,
    "slug": slug.current,
    "posts": *[_type=='post' && references(^._id)][0..2]{
      title,
      "slug": slug.current,
    },
    "numberOfPosts": count(*[_type == "post" && references(^._id)])
  }
`

export const getStaticProps = async () => {
  const collections = await client.fetch(query)

  return {
    props: {
      collections,
    },
  }
}

export default BlogList
