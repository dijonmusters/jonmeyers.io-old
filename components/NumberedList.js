import Link from 'components/Link'
import { md } from 'utils/mediaQueries'
import styled from 'styled-components'

const List = styled.ul`
  padding: 0;
  list-style: none;
`

const Item = styled.li`
  position: relative;
  font-size: 1.25rem;
  font-weight: 200;
  padding: 0;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.hover};
  }
`

const Num = styled.span`
  margin-right: 1rem;
  font-size: 2rem;
  color: ${(props) => props.theme.muted3};
  flex-basis: 3rem;
  text-align: right;

  ${md`
    flex-basis: 3rem;
  `}
`

const Text = styled.p`
  flex: 1;
  margin: 0.5rem 0;

  ${md`

  `}
`

const NumberedLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NumberedList = ({ items, individualPath }) => (
  <List>
    {items.map((item, i) => (
      <Item key={item.slug}>
        <NumberedLink href={`${individualPath}/${item.slug}`}>
          <Num>{i + 1}.</Num>
          <Text>{item.title}</Text>
        </NumberedLink>
      </Item>
    ))}
  </List>
)

export default NumberedList
