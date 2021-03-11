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
`

const Arrow = styled(IoIosArrowRoundBack)`
  font-size: 2rem;
  margin-right: 0.25rem;
`

const HighlightLink = styled(Link)`
  text-transform: uppercase;
`

const Breadcrumbs = ({ title, slug }) => (
  <HighlightLink href={`/blog/${slug}`}>
    <Crumb>
      <Arrow />
      {title}
    </Crumb>
  </HighlightLink>
)

export default Breadcrumbs
