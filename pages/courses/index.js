import styled from 'styled-components'
import Container from 'components/Container'
import { md } from 'utils/mediaQueries'
import SEO from 'components/SEO'
import { client } from 'utils/sanity'
import MultiList from 'components/MultiList'

const Centered = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin: 0;

  ${md`
    font-size: 2rem;
  `};
`

const CourseList = styled(MultiList)`
  ${md`
    padding: 0 2rem;
  `};
`

const Courses = ({ courses }) => {
  return (
    <>
      <SEO
        title="Even more courses"
        description="A collection of developer-focused, practical, web development courses written by Jon Meyers."
      />
      <Container>
        {courses.length > 0 ? (
          <CourseList
            collection={courses}
            listPath="/courses"
            collectionPath="/courses"
            individualPath="/lessons"
          />
        ) : (
          <Centered>No blog posts!</Centered>
        )}
      </Container>
    </>
  )
}

const query = `
  *[(_type == 'course' && isPublished == true) || (_type == 'lesson' && isPublished == true && !defined(course))] | order(createdAt desc) {
    title,
    "slug": slug.current,
    _type == 'course' => {
      "collection": *[_type == 'lesson' && references(^._id) && isPublished == true] | order(positionInCourse asc) [0..2] {
        title,
        "slug": slug.current,
      },
      "itemsInCollection": count(*[_type == "lesson" && references(^._id) && isPublished == true])
    },
    _type == 'lesson' => {
      "description": seoDescription,
    }
  }
`

export const getStaticProps = async () => {
  const courses = await client.fetch(query)

  return {
    props: {
      courses,
    },
  }
}

export default Courses
