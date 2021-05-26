import { client } from 'utils/sanity'
import Container from 'components/Container'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'
import Player from 'react-player/lazy'
import { lg } from 'utils/mediaQueries'

const Title = styled.h1`
  margin: 3rem 0;

  ${lg`
    font-size: 3rem;
  `}
`

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 300;
`

const VideoContainer = styled.div`
  margin-top: 4rem;
  position: relative;
  padding-top: 56.25%;
`

const VideoPlayer = styled(Player)`
  position: absolute;
  top: 0;
  left: 0;
`

const Lesson = ({ lesson }) => {
  const isPartOfCourse = !!lesson.course
  const breadcrumbTitle = isPartOfCourse ? lesson.course.title : 'All Courses'
  const breadcrumbSlug = isPartOfCourse
    ? `/courses/${lesson.course.slug}`
    : '/courses'

  return (
    <Container>
      <SEO title={lesson.title} description={lesson.seoDescription} />
      <Breadcrumbs title={breadcrumbTitle} slug={breadcrumbSlug} />
      <Title>{lesson.title}</Title>
      <Description>{lesson.seoDescription}</Description>
      <VideoContainer>
        <VideoPlayer
          width="100%"
          height="100%"
          url={lesson.videoUrl}
          controls={true}
        />
      </VideoContainer>
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
