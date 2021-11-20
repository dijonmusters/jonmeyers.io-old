import styled from 'styled-components'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Link from './Link'
import { useRouter } from 'next/router'

const Container = styled.div`
  background: ${(props) => props.theme.offBackground};
  color: ${(props) => props.theme.mutedTextOnGray};
  margin-bottom: 3rem;
`

const Arrow = styled(IoIosArrowRoundBack)`
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 2rem;
  margin-right: 0.25rem;
`

const Anchor = styled.a`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #dfdfdf;

  &:hover > :last-child {
    text-decoration: underline;
  }
`

const Heading = styled(Anchor)`
  font-weight: 800;
  font-size: 1.25rem;
  padding: 2rem;
`

const Number = styled.span`
  flex-grow: 0;
  flex-shrink: 0;
  background: ${(props) =>
    props.isActive ? props.theme.highlight : props.theme.backgroundGray};
  color: ${(props) =>
    props.isActive ? props.theme.textOnHighlight : props.theme.textOnGray};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`

const Text = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TableOfContents = ({ series, title, slug }) => {
  const router = useRouter()
  return (
    <Container>
      <Link href={slug}>
        <Heading>
          <Arrow />
          <Text>{title}</Text>
        </Heading>
      </Link>
      {series.map((article) => (
        <Link href={article.slug}>
          <Anchor>
            <Number isActive={router.asPath === `/blog/${article.slug}`}>
              {article.positionInSeries}
            </Number>
            <Text>{article.title}</Text>
          </Anchor>
        </Link>
      ))}
    </Container>
  )
}

export default TableOfContents
