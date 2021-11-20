import Link from 'components/Link'
import styled from 'styled-components'

const List = styled.ul`
  padding: 0;
  list-style: none;
  background: ${(props) => props.theme.offBackground};
  color: ${(props) => props.theme.mutedTextOnGray};
  margin-bottom: 3rem;
`

const Anchor = styled.a`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #dfdfdf;

  &:hover > :last-child {
    text-decoration: underline;
  }
`

const Number = styled.span`
  flex-grow: 0;
  flex-shrink: 0;
  background: ${(props) =>
    props.isActive ? props.theme.highlight : props.theme.backgroundGray};
  color: ${(props) =>
    props.isActive ? props.theme.textOnHighlight : props.theme.textOnGray};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`

const Text = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const NumberedList = ({ items, individualPath }) => (
  <List>
    {items.map((item, i) => (
      <Link key={item.slug} href={`${individualPath}/${item.slug}`}>
        <Anchor>
          <Number>{i + 1}</Number>
          <Text>{item.title}</Text>
        </Anchor>
      </Link>
    ))}
  </List>
)

export default NumberedList
