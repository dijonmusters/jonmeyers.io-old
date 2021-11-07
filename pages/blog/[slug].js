import Container from 'components/Container'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Breadcrumbs from 'components/Breadcrumbs'
import { lg } from 'utils/mediaQueries'
import slugify from 'utils/slugify'
import { Client } from '@notionhq/client'
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser'
import 'highlight.js/styles/night-owl.css'
import { useEffect } from 'react'
import { copyToClipboard } from 'utils/copyToClipboard'
import TableOfContents from 'components/TableOfContents'

const Title = styled.h1`
  margin: 3rem 0;

  ${lg`
    font-size: 3rem;
  `}
`

const Body = styled.div`
  p {
    line-height: 32px;
    margin: 1.5rem 0;
    font-size: 1.25rem;
    font-weight: 200;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 0;
  }

  pre {
    margin: 3rem 0;
  }

  blockquote {
    position: relative;
    margin: 3rem 0;
    padding: 0.25rem 2rem;
    border-radius: 5px;
    background-color: ${(props) => props.theme.nightOwlBackground};
    color: ${(props) => props.theme.nightOwlText};
    font-style: italic;

    & > p {
      font-size: 1.125rem;
    }

    &:before {
      position: absolute;
      width: 0.5rem;
      height: 100%;
      left: 0;
      top: 0;
      content: '';
      background: ${(props) => props.theme.highlight};
      border-radius: 5px 0 0 5px;
    }
  }

  a {
    color: ${(props) => props.theme.highlight};
  }

  li {
    line-height: 32px;
    font-weight: 200;
  }

  figure {
    margin: 3rem 0;
  }

  img {
    width: 100%;
  }

  pre {
    position: relative;
    overflow: hidden;
    padding: 0.5rem;
    border-radius: 5px;
    background-image: linear-gradient(
        135deg,
        rgba(107, 107, 107, 0.04) 0%,
        rgba(107, 107, 107, 0.04) 46%,
        rgba(81, 81, 81, 0.04) 46%,
        rgba(81, 81, 81, 0.04) 51%,
        rgba(110, 110, 110, 0.04) 51%,
        rgba(110, 110, 110, 0.04) 56%,
        rgba(113, 113, 113, 0.04) 56%,
        rgba(113, 113, 113, 0.04) 87%,
        rgba(142, 142, 142, 0.04) 87%,
        rgba(142, 142, 142, 0.04) 100%
      ),
      linear-gradient(
        135deg,
        rgba(2, 2, 2, 0.06) 0%,
        rgba(2, 2, 2, 0.06) 33%,
        rgba(165, 165, 165, 0.06) 33%,
        rgba(165, 165, 165, 0.06) 69%,
        rgba(39, 39, 39, 0.06) 69%,
        rgba(39, 39, 39, 0.06) 73%,
        rgba(93, 93, 93, 0.06) 73%,
        rgba(93, 93, 93, 0.06) 86%,
        rgba(162, 162, 162, 0.06) 86%,
        rgba(162, 162, 162, 0.06) 88%,
        rgba(76, 76, 76, 0.06) 88%,
        rgba(76, 76, 76, 0.06) 91%,
        rgba(247, 247, 247, 0.06) 91%,
        rgba(247, 247, 247, 0.06) 96%,
        rgba(115, 115, 115, 0.06) 96%,
        rgba(115, 115, 115, 0.06) 100%
      ),
      linear-gradient(
        0deg,
        rgba(122, 122, 122, 0.01) 0%,
        rgba(122, 122, 122, 0.01) 47%,
        rgba(109, 109, 109, 0.01) 47%,
        rgba(109, 109, 109, 0.01) 51%,
        rgba(41, 41, 41, 0.01) 51%,
        rgba(41, 41, 41, 0.01) 58%,
        rgba(212, 212, 212, 0.01) 58%,
        rgba(212, 212, 212, 0.01) 71%,
        rgba(199, 199, 199, 0.01) 71%,
        rgba(199, 199, 199, 0.01) 81%,
        rgba(141, 141, 141, 0.01) 81%,
        rgba(141, 141, 141, 0.01) 85%,
        rgba(186, 186, 186, 0.01) 85%,
        rgba(186, 186, 186, 0.01) 98%,
        rgba(234, 234, 234, 0.01) 98%,
        rgba(234, 234, 234, 0.01) 100%
      ),
      linear-gradient(
        90deg,
        rgba(233, 233, 233, 0.06) 0%,
        rgba(233, 233, 233, 0.06) 37%,
        rgba(62, 62, 62, 0.06) 37%,
        rgba(62, 62, 62, 0.06) 69%,
        rgba(96, 96, 96, 0.06) 69%,
        rgba(96, 96, 96, 0.06) 70%,
        rgba(64, 64, 64, 0.06) 70%,
        rgba(64, 64, 64, 0.06) 76%,
        rgba(151, 151, 151, 0.06) 76%,
        rgba(151, 151, 151, 0.06) 89%,
        rgba(249, 249, 249, 0.06) 89%,
        rgba(249, 249, 249, 0.06) 100%
      ),
      linear-gradient(90deg, rgb(97, 99, 229), rgb(18, 250, 185));
  }

  pre > code {
    border-radius: 5px;
    padding: 2rem;
    cursor: pointer;
  }

  pre > code:hover {
    filter: brightness(130%);
  }

  pre > code:before {
    position: absolute;
    content: 'Copied to clipboard';
    color: white;
    width: 100%;
    height: 100%;
    left: 0;
    top: -100%;
    background: #000000dd;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s ease-in-out;
    font-family: 'Open Sans', sans-serif;
  }

  pre > code.copied:before {
    transform: translateY(100%);
  }

  *:not(pre) > code {
    background: ${(props) => props.theme.offHighlight};
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
  }

  blockquote > *:not(pre) > code {
    background: ${(props) => props.theme.nightOwlOffBackground};
  }
`

const Article = ({ article }) => {
  console.log({ article })
  const breadcrumbTitle = article.isPartOfSeries
    ? article.seriesTitle
    : 'All Articles'
  const breadcrumbSlug = article.isPartOfSeries
    ? `/series/${article.seriesSlug}`
    : '/blog'

  useEffect(() => {
    document.querySelectorAll('pre > code').forEach((element) => {
      element.addEventListener('click', () => {
        copyToClipboard(element.textContent)
        element.classList.add('copied')

        setTimeout(() => {
          element.classList.remove('copied')
        }, 2000)
      })
    })
  }, [])

  return (
    <Container>
      <Title>{article.title}</Title>
      <SEO title={article.title} description={article.description} />
      {article.isPartOfSeries ? (
        <TableOfContents
          series={article.articlesInSeries}
          title={breadcrumbTitle}
          slug={breadcrumbSlug}
        />
      ) : (
        <Breadcrumbs title={breadcrumbTitle} slug={breadcrumbSlug} />
      )}
      <Body dangerouslySetInnerHTML={{ __html: article.html }} />
    </Container>
  )
}

export const getStaticPaths = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let results = []

  let data = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: 'Is Published',
      checkbox: {
        equals: true,
      },
    },
  })

  results = [...results, ...data.results]

  while (data.has_more) {
    data = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
      filter: {
        property: 'Is Published',
        checkbox: {
          equals: true,
        },
      },
      start_cursor: data.next_cursor,
    })
    results = [...results, ...data.results]
  }

  const paths = results.map((result) => ({
    params: {
      slug: slugify(result.properties.Name.title[0].plain_text),
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let results = []

  let data = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    filter: {
      property: 'Is Published',
      checkbox: {
        equals: true,
      },
    },
  })

  results = [...data.results]

  while (data.has_more) {
    data = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
      filter: {
        property: 'Is Published',
        checkbox: {
          equals: true,
        },
      },
      start_cursor: data.next_cursor,
    })
    results = [...results, ...data.results]
  }

  const pageMetaData = results.find(
    (result) => slugify(result.properties.Name.title[0].plain_text) === slug
  )

  data = await notion.blocks.children.list({
    block_id: pageMetaData.id,
  })

  results = [...data.results]

  while (data.has_more) {
    data = await notion.blocks.children.list({
      block_id: pageMetaData.id,
      start_cursor: data.next_cursor,
    })
    results = [...results, ...data.results]
  }

  let articleData = {}

  if (pageMetaData.properties.Series.relation.length > 0) {
    const series = await notion.pages.retrieve({
      page_id: pageMetaData.properties.Series.relation[0].id,
    })

    const unsortedArticlesInSeries = await Promise.all(
      series.properties['Related to Articles (Series)'].relation.map(
        async ({ id }) => {
          const seriesArticle = await notion.pages.retrieve({ page_id: id })
          return {
            title: seriesArticle.properties.Name.title[0].plain_text,
            positionInSeries:
              seriesArticle.properties['Position in Series'].number,
            slug: slugify(seriesArticle.properties.Name.title[0].plain_text),
          }
        }
      )
    )

    const articlesInSeries = (await unsortedArticlesInSeries).sort(
      (a, b) => a.positionInSeries - b.positionInSeries
    )

    const seriesTitle = series.properties.Name.title[0].plain_text

    articleData = {
      isPartOfSeries: true,
      seriesTitle,
      seriesSlug: slugify(seriesTitle),
      articlesInSeries,
    }
  }

  const article = {
    title: pageMetaData.properties.Name.title[0].plain_text,
    description: pageMetaData.properties.Description.rich_text[0].plain_text,
    html: NotionBlocksHtmlParser.getInstance().parse(results),
    ...articleData,
  }

  return {
    props: {
      article,
    },
    revalidate: 60,
  }
}

export default Article
