import styled from 'styled-components'
import { md } from 'utils/mediaQueries'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0;
  color: ${(props) => props.theme.highlight};
  transition: ${(props) => props.theme.transition};

  ${md`
    font-size: 4rem;
  `};
`

const Subtitle = styled.p`
  margin-top: 0;

  ${md`
    font-size: 1.5rem;
  `};
`

const HomePage = () => {
  return (
    <Container>
      <Title>This should not render</Title>
      <Subtitle>Broken redirect in next.config.js</Subtitle>
    </Container>
  )
}

export default HomePage
