import styled from 'styled-components'
import { md } from 'utils/mediaQueries'

const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 1rem;

  ${md`
    padding: 2rem;
  `}
`

export default Container
