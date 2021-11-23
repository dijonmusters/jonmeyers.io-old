import styled from 'styled-components'
import { useRouter } from 'next/router'
import { FaTwitter } from 'react-icons/fa'
import TextFit from 'react-textfit'

const Container = styled.div`
  position: relative;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background-image: ${(props) => props.theme.gradient};
`

const Panel = styled.div`
  position: absolute;
  left: 1rem;
  right: 1rem;
  top: 1rem;
  bottom: 1rem;
  background: #111;
  color: #e1e1e1;
  border-radius: 20px 20px 0 0;
  display: flex;
  overflow: hidden;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
`

const Title = styled.div`
  position: relative;
  flex: 2;
  padding: 4rem;
`

const Post = styled(TextFit)`
  height: 80%;
  font-weight: 600;
  color: white;
`

const Dijon = styled.div`
  flex: 1;
  background: #222;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Logo = styled.img`
  width: 300px;
`

const Author = styled.p`
  margin: 0;
  font-size: 3rem;
`

const Twitter = styled.p`
  font-size: 2.5rem;
  font-weight: 300;
  color: #a1a1a1;
  position: absolute;
  bottom: 1rem;
  display: flex;
  align-items: center;
`

const TwitterIcon = styled(FaTwitter)`
  margin-right: 1rem;
`

const GenerateOg = () => {
  const { title } = useRouter().query

  return (
    <Container id="og-image">
      <Panel>
        <Title>
          <Post min={24}>{title}</Post>
          <Twitter>
            <TwitterIcon />
            _dijonmusters
          </Twitter>
        </Title>
        <Dijon>
          <Logo src="/dijon.png" />
          <Author>jonmeyers.io</Author>
        </Dijon>
      </Panel>
    </Container>
  )
}

export default GenerateOg
