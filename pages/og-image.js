import styled from 'styled-components'
import { useRouter } from 'next/router'
import { FaTwitter } from 'react-icons/fa'
import TextFit from 'react-textfit'

const Container = styled.div`
  position: relative;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background-image: linear-gradient(
      135deg,
      rgba(107, 107, 107, 0.04) 0%,
      rgba(107, 107, 107, 0.04) 46%,
      rgba(81, 81, 81, 0.04) 46%,
      rgba(81, 81, 81, 0.04) 51%,
      rgba(110, 110, 110, 0.04) 51%,
      rgba(110, 110, 110, 0.04) 56%,
      rgba(113, 113, 113, 0.04) 56%,
      rgba(113, 113, 113, 0.04) 87%,
      rgba(142, 142, 142, 0.04) 87%,
      rgba(142, 142, 142, 0.04) 100%
    ),
    linear-gradient(
      135deg,
      rgba(2, 2, 2, 0.06) 0%,
      rgba(2, 2, 2, 0.06) 33%,
      rgba(165, 165, 165, 0.06) 33%,
      rgba(165, 165, 165, 0.06) 69%,
      rgba(39, 39, 39, 0.06) 69%,
      rgba(39, 39, 39, 0.06) 73%,
      rgba(93, 93, 93, 0.06) 73%,
      rgba(93, 93, 93, 0.06) 86%,
      rgba(162, 162, 162, 0.06) 86%,
      rgba(162, 162, 162, 0.06) 88%,
      rgba(76, 76, 76, 0.06) 88%,
      rgba(76, 76, 76, 0.06) 91%,
      rgba(247, 247, 247, 0.06) 91%,
      rgba(247, 247, 247, 0.06) 96%,
      rgba(115, 115, 115, 0.06) 96%,
      rgba(115, 115, 115, 0.06) 100%
    ),
    linear-gradient(
      0deg,
      rgba(122, 122, 122, 0.01) 0%,
      rgba(122, 122, 122, 0.01) 47%,
      rgba(109, 109, 109, 0.01) 47%,
      rgba(109, 109, 109, 0.01) 51%,
      rgba(41, 41, 41, 0.01) 51%,
      rgba(41, 41, 41, 0.01) 58%,
      rgba(212, 212, 212, 0.01) 58%,
      rgba(212, 212, 212, 0.01) 71%,
      rgba(199, 199, 199, 0.01) 71%,
      rgba(199, 199, 199, 0.01) 81%,
      rgba(141, 141, 141, 0.01) 81%,
      rgba(141, 141, 141, 0.01) 85%,
      rgba(186, 186, 186, 0.01) 85%,
      rgba(186, 186, 186, 0.01) 98%,
      rgba(234, 234, 234, 0.01) 98%,
      rgba(234, 234, 234, 0.01) 100%
    ),
    linear-gradient(
      90deg,
      rgba(233, 233, 233, 0.06) 0%,
      rgba(233, 233, 233, 0.06) 37%,
      rgba(62, 62, 62, 0.06) 37%,
      rgba(62, 62, 62, 0.06) 69%,
      rgba(96, 96, 96, 0.06) 69%,
      rgba(96, 96, 96, 0.06) 70%,
      rgba(64, 64, 64, 0.06) 70%,
      rgba(64, 64, 64, 0.06) 76%,
      rgba(151, 151, 151, 0.06) 76%,
      rgba(151, 151, 151, 0.06) 89%,
      rgba(249, 249, 249, 0.06) 89%,
      rgba(249, 249, 249, 0.06) 100%
    ),
    linear-gradient(90deg, rgb(97, 99, 229), rgb(18, 250, 185));
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
  /* right: 2rem; */
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
