import { client } from 'utils/sanity'
import Container from 'components/Container'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'

const Title = styled.h1`
  margin: 3rem 0;
  font-size: 3rem;
`

const Lesson = ({ lesson }) => {
  return (
    <Container>
      <SEO title={lesson.title} description={lesson.seoDescription} />
      <Breadcrumbs
        title={lesson.course.title}
        slug={`/courses/${lesson.course.slug}`}
      />
      <Title>{lesson.title}</Title>
      <p>{lesson.videoUrl}</p>
    </Container>
  )
}

const allSlugsQuery = `
  *[_type=="lesson" && isPublished == true] {
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

const lessonQuery = `
  *[_type == 'lesson' && slug.current == $slug][0]{
    title,
    seoDescription,
    videoUrl,
    course->{
      title,
      "slug": slug.current,
    }
  }
`

export const getStaticProps = async ({ params: { slug } }) => {
  const lesson = await client.fetch(lessonQuery, { slug })

  return {
    props: {
      lesson,
    },
  }
}

export default Lesson
