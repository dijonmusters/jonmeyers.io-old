import Container from 'components/Container'
import styled from 'styled-components'
import { lg } from 'utils/mediaQueries'

const Page = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 2rem;
  text-align: center;

  ${lg`
    font-size: 4rem;
  `}
`

const Text = styled.p`
  margin-top: 0;
  text-align: center;
  font-size: 1rem;

  ${lg`
    font-size: 1.5rem;
  `}
`

const ConfirmationSaaS = () => {
  return (
    <Page>
      <Title>Thanks for signing up!</Title>
      <Text>I will let you know when the course is live!</Text>
    </Page>
  )
}

export default ConfirmationSaaS
