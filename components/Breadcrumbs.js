import Link from 'components/Link'
import styled from 'styled-components'
import { IoIosArrowRoundBack } from 'react-icons/io'

const Container = styled.div`
  background: ${(props) => props.theme.offBackground3};
  color: ${(props) => props.theme.offColor3};
  margin-bottom: 3rem;
`

const Arrow = styled(IoIosArrowRoundBack)`
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 2rem;
  margin-right: 0.25rem;
`

const Crumb = styled.a`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  font-weight: 800;
  font-size: 1.25rem;
  padding: 2rem;

  &:hover {
    text-decoration: underline;
  }
`

const Text = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`

const Breadcrumbs = ({ title, slug }) => (
  <Container>
    <Link href={slug}>
      <Crumb>
        <Arrow />
        <Text>{title}</Text>
      </Crumb>
    </Link>
  </Container>
)

export default Breadcrumbs
