import styled from 'styled-components'
import Container from 'components/Container'
import MultiList from 'components/MultiList'
import { md } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import { client } from 'utils/sanity'

const ArticleList = styled(MultiList)`
  ${md`
    padding: 0 2rem;
    margin-top: 4rem;
  `};
`

const BlogList = ({ articles }) => (
  <>
    <SEO
      title="Yet another blog"
      description="A collection of developer-focused, practical, web development blog posts written by Jon Meyers."
    />
    <Container>
      {articles.length > 0 ? (
        <ArticleList
          collection={articles}
          listPath="/blog"
          collectionPath="/series"
          individualPath="/blog"
        />
      ) : (
        <Centered>No blog posts!</Centered>
      )}
    </Container>
  </>
)

const query = `
  *[(_type == 'series' && isPublished == true) || (_type == 'article' && isPublished == true && !defined(series))] | order(createdAt desc) {
    title,
    "slug": slug.current,
    _type == 'series' => {
      "collection": *[_type == 'article' && references(^._id) && isPublished == true] | order(positionInSeries asc) [0..2] {
        title,
        "slug": slug.current,
      },
      "itemsInCollection": count(*[_type == "article" && references(^._id) && isPublished == true])
    },
    _type == 'article' => {
      "description": seoDescription,
    }
  }
`

export const getStaticProps = async () => {
  const articles = await client.fetch(query)

  return {
    props: {
      articles,
    },
  }
}

export default BlogList
