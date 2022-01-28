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

const ConfirmationSaaS = () => {
  return (
    <>
      <SEO
        title="Subscribed to Remix course on Level Up Tutorials"
        description="Subscribed to the upcoming Level Up Tutorials course building an app with Remix and Supabase"
      />
      <Page>
        <Title>Thanks for signing up!</Title>
        <Text>I will let you know when the course is live!</Text>
      </Page>
    </>
  )
}

export default ConfirmationSaaS
