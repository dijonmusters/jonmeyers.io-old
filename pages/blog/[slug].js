import fs from 'fs'
import matter from 'gray-matter'
import marked from 'marked'

const Blog = ({ blog }) => {
  const html = marked(blog.content)

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.tags.join(', ')}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default Blog

export const getStaticPaths = () => {
  const directory = `${process.cwd()}/content/blog`
  const filenames = fs.readdirSync(directory)

  const paths = filenames.map((filename) => {
    return {
      params: {
        slug: filename.replace('.md', ''),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  const filepath = `${process.cwd()}/content/blog/${slug}.md`
  const fileContent = fs.readFileSync(filepath).toString()
  const { data, content } = matter(fileContent)

  return {
    props: {
      blog: {
        ...data,
        content,
        slug: `/blog/${slug}`,
      },
    },
  }
}
