import Container from 'components/Container'
import styled from 'styled-components'

const Page = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h2`
  font-size: 4rem;
  margin-bottom: 1rem;
`

const Text = styled.p`
  margin-top: 0;
  font-size: 1.5rem;
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
