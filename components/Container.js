import styled from 'styled-components'
import { md } from 'utils/mediaQueries'

const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: 1rem;

  ${md`
    padding: 2rem;
  `}
`

export default Container
