import Container from 'components/Container'
import styled from 'styled-components'
import { lg } from 'utils/mediaQueries'
import SEO from 'components/SEO'

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

const UnsubscribeNewsletter = () => {
  return (
    <>
      <SEO
        title="Unsubscribed from weekly Newsletter"
        description="You have successfully unsubscribed from Jon's weekly newsletter"
      />
      <Page>
        <Title>Not a problem 👍</Title>
        <Text>I will only let you know about the big stuff.</Text>
        <Text>No more weekly newsletter!</Text>
      </Page>
    </>
  )
}

export default UnsubscribeNewsletter
