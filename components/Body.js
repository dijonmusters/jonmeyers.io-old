import styled from 'styled-components'

const Html = styled.div`
  p {
    line-height: 32px;
    margin: 1.5rem 0;
    font-size: 1.25rem;
    font-weight: 200;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 0;
  }

  pre {
    margin: 3rem 0;
  }

  blockquote {
    position: relative;
    margin: 3rem 0;
    padding: 0.25rem 2rem;
    border-radius: 5px;
    background-color: ${(props) => props.theme.nightOwlBackground};
    color: ${(props) => props.theme.nightOwlText};
    font-style: italic;

    & > p {
      font-size: 1.125rem;
    }

    &:before {
      position: absolute;
      width: 0.5rem;
      height: 100%;
      left: 0;
      top: 0;
      content: '';
      background: ${(props) => props.theme.highlight};
      border-radius: 5px 0 0 5px;
    }
  }

  a {
    color: ${(props) => props.theme.highlight};
  }

  li {
    line-height: 32px;
    font-weight: 200;
  }

  figure {
    margin: 3rem 0;
  }

  img {
    width: 100%;
  }

  pre {
    position: relative;
    overflow: hidden;
    padding: 0.5rem;
    border-radius: 5px;
    background-image: ${(props) => props.theme.gradient};
  }

  pre > code {
    border-radius: 5px;
    padding: 2rem;
    cursor: pointer;
  }

  pre > code:hover {
    filter: brightness(130%);
  }

  pre > code:before {
    position: absolute;
    content: 'Copied to clipboard';
    color: white;
    width: 100%;
    height: 100%;
    left: 0;
    top: -100%;
    background: #000000dd;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s ease-in-out;
    font-family: 'Open Sans', sans-serif;
  }

  pre > code.copied:before {
    transform: translateY(100%);
  }

  *:not(pre) > code {
    background: ${(props) => props.theme.backgroundGray};
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
  }

  blockquote > *:not(pre) > code {
    background: ${(props) => props.theme.nightOwlOffBackground};
  }
`

const Body = ({ html }) => {
  return <Html dangerouslySetInnerHTML={{ __html: html }} />
}

export default Body
