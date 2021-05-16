import Link from 'components/Link'
import styled from 'styled-components'
import { IoIosArrowRoundBack } from 'react-icons/io'

const Crumb = styled.span`
  margin-top: 1rem;
  margin-bottom: -1rem;
  color: ${(props) => props.theme.muted2};
  display: flex;
  align-items: center;
  text-transform: uppercase;

  &:hover {
    color: ${(props) => props.theme.color};
  }
`

const Arrow = styled(IoIosArrowRoundBack)`
  font-size: 2rem;
  margin-right: 0.25rem;
`

const CrumbLink = styled(Link)`
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
`

const Text = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`

const Breadcrumbs = ({ title, slug }) => (
  <CrumbLink href={slug}>
    <Crumb>
      <Arrow />
      <Text>{title}</Text>
    </Crumb>
  </CrumbLink>
)

export default Breadcrumbs
