import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'

const BlogList = ({ blogs }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.slug}>
          <Link href={blog.slug}>
            <a>{blog.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content/blog`
  const filenames = fs.readdirSync(directory)

  const blogs = filenames.map((filename) => {
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString()
    const { data, content } = matter(fileContent)
    const slug = `/blog/${filename.replace('.md', '')}`

    return {
      ...data,
      content,
      slug,
    }
  })

  return {
    props: {
      blogs,
    },
  }
}

export default BlogList
