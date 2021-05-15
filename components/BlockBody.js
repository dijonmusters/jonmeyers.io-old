import BlockContent from '@sanity/block-content-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
  materialLight,
} from 'node_modules/react-syntax-highlighter/dist/esm/styles/prism'
import { nightOwl } from 'node_modules/react-syntax-highlighter/dist/esm/styles/hljs'
import useDarkMode from 'hooks/useDarkMode'
import styled from 'styled-components'

const Pre = styled.pre`
  background: transparent;
`

const Code = styled.div`
  margin: 3rem 0;
`

const Body = styled(BlockContent)`
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
    margin: 3rem 0;
    padding: 2rem;
    background-color: ${(props) => props.theme.offBackground2};
    color: ${(props) => props.theme.muted};
    font-style: italic;
    border-left: 5px solid ${(props) => props.theme.highlight};
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
`

const BlockBody = ({ blocks }) => {
  const { isDarkTheme } = useDarkMode()

  const serializers = {
    types: {
      code: ({ node }) => (
        <Code>
          <SyntaxHighlighter
            language={node.language}
            style={isDarkTheme() ? materialDark : materialLight}
            showLineNumbers
          >
            {node.code}
          </SyntaxHighlighter>
        </Code>
      ),
    },
  }

  return (
    <Body
      blocks={blocks}
      serializers={serializers}
      imageOptions={{ w: 800, fit: 'max' }}
      projectId="u3w4h9it"
      dataset="production"
    />
  )
}

export default BlockBody
