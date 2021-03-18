import Link from './Link'
import styled from 'styled-components'
import { IoIosArrowRoundBack } from 'react-icons/io'

const Crumb = styled.span`
  margin-top: 3rem;
  margin-bottom: -1rem;
  color: ${(props) => props.theme.muted2};
  display: flex;
  align-items: center;
  width: fit-content;
  text-transform: uppercase;

  &:hover {
    color: ${(props) => props.theme.color};
  }
`

const Arrow = styled(IoIosArrowRoundBack)`
  font-size: 2rem;
  margin-right: 0.25rem;
`

const Breadcrumbs = ({ title, slug }) => (
  <Link href={slug} hover>
    <Crumb>
      <Arrow />
      {title}
    </Crumb>
  </Link>
)

export default Breadcrumbs
