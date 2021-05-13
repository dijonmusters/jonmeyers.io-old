import Link from 'components/Link'
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
  position: absolute;
  left: 1rem;
  font-size: 2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.muted3};
  text-align: right;
  width: 3ch;
`

const Text = styled.p`
  margin: 0;
  margin-left: 2.5rem;
  padding: 0.5rem 2rem;
`

const NumberedList = ({ items, individualPath }) => (
  <List>
    {items.map((item, i) => (
      <Item key={item.slug}>
        <Link href={`${individualPath}/${item.slug}`}>
          <Num>{i + 1}.</Num>
          <Text>{item.title}</Text>
        </Link>
      </Item>
    ))}
  </List>
)

export default NumberedList
