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

const ConfirmationMailingList = () => {
  return (
    <>
      <SEO
        title="Joined the mailing list"
        description="You have joined the mailing list. I will let you know when new stuff comes out!"
      />
      <Page>
        <Title>Thanks for joining the mailing list!</Title>
        <Text>I will let you know when new stuff comes out!</Text>
      </Page>
    </>
  )
}

export default ConfirmationMailingList
