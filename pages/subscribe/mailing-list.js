import axios from 'axios'
import Container from 'components/Container'
import { useState } from 'react'
import styled from 'styled-components'
import { lg } from 'utils/mediaQueries'
import EmailValidator from 'email-validator'
import SEO from 'components/SEO'

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  margin-top: 4rem;
  margin-bottom: 3rem;
  font-size: 2rem;
  text-align: center;

  ${lg`
    font-size: 2rem;
  `}
`

const InputWrapper = styled.div`
  border: 3px solid transparent;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  &:focus-within {
    border: 3px solid ${(props) => props.theme.highlight2};
  }

  ${lg`
    flex-direction: row;
  `}
`

const Input = styled.input`
  flex: 1;
  background: ${(props) => props.theme.offBackground};
  border: none;
  outline: none;
  color: ${(props) => props.theme.color};
  padding: 1rem 1.5rem;
  line-height: 2;
  font-size: 1.5rem;
`

const Button = styled.button`
  background: transparent;
  border: none;
  background: ${(props) => props.theme.highlight};
  color: ${(props) => props.theme.textOnHighlight};
  padding: 1rem;
  line-height: 2;
  font-size: 1rem;

  ${lg`
    flex: 1;
  `}
`

const MailingList = () => {
  const [emailInput, setEmailInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [responseMessage, setResponseMessage] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setEmailInput('')
    setIsLoading(true)

    const { data } = await axios.post('/api/subscribe/newsletter', {
      email: emailInput,
    })

    setResponseMessage(data)
    setIsLoading(false)
  }

  const handleInput = (e) => {
    const newValue = e.target.value
    setIsEmailValid(EmailValidator.validate(newValue))
    setEmailInput(newValue)
  }

  return (
    <>
      <SEO
        title="Subscribe to mailing list"
        description="Subscribe to my mailing list to hear about new stuff!"
      />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>Hear about new stuff 👇</Title>
          <InputWrapper>
            <Input
              type="email"
              placeholder="Email Address"
              value={emailInput}
              onChange={handleInput}
              disabled={isLoading}
            />
            <Button disabled={isLoading || !isEmailValid}>Let me know!</Button>
          </InputWrapper>
          {responseMessage && <p>{responseMessage}</p>}
        </Form>
      </Container>
    </>
  )
}

export default MailingList
