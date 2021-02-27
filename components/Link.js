import NextLink from 'next/link'
import styled from 'styled-components'

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 100%;

  &:hover {
    cursor: pointer;
  }
`

const Link = ({ children, href, className }) => {
  return (
    <NextLink href={href}>
      <Anchor className={className}>{children}</Anchor>
    </NextLink>
  )
}

export default Link
