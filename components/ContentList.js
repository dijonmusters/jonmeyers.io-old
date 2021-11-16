import styled from 'styled-components'
import { lg } from 'utils/mediaQueries'
import Link from 'components/Link'
import { IoIosArrowRoundForward } from 'react-icons/io'

const Root = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const ListItem = styled.li`
  padding: 0;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;

  ${lg`
    font-size: 2rem;
  `};
`

const Description = styled.p`
  color: ${(props) => props.theme.muted2};
  font-size: 1rem;
  margin: 0;
  padding: 0.25rem 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LinkItem = styled(Link)`
  text-decoration: none;
  position: relative;
  font-size: 1.25rem;
  font-weight: 200;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  ${lg`
    font-size: 1.5rem;
    padding: 1rem;
  `};

  &:hover {
    background-color: ${(props) => props.theme.hover};
  }
`

const UnstyledLink = styled.a`
  text-decoration: none;
  position: relative;
  font-size: 1.25rem;
  font-weight: 200;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  ${lg`
    font-size: 1.5rem;
    padding: 1rem;
  `};

  &:hover {
    background-color: ${(props) => props.theme.hover};
  }

  &:visited {
    color: inherit;
  }
`

const ConnectedBullets = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Bullet = styled.li`
  position: relative;
  padding: 0.25rem 1.25rem;
  font-size: 1rem;
  color: ${(props) => props.theme.muted2};

  &:before {
    background-color: ${(props) => props.theme.separator};
    width: 1px;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.5rem;
  }

  &:last-child:before {
    height: 52%;
  }

  &:after {
    width: 0.5rem;
    border-bottom: solid 1px ${(props) => props.theme.separator};
    content: '';
    position: absolute;
    left: calc(0.5rem + 1px);
    top: 50%;
    transform: translateY(-50%);
  }
`

const HoverLink = styled(Link)`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: ${(props) => props.theme.color};
  }
`

const More = styled.div`
  display: flex;
  align-items: center;
`

const Arrow = styled(IoIosArrowRoundForward)`
  font-size: 1.5rem;
`

const Bullets = ({ item }) => (
  <ConnectedBullets>
    {item.collection.length > 0 ? (
      item.collection.map((individualItem) => (
        <Bullet key={individualItem.slug}>
          <HoverLink href={individualItem.slug}>
            {individualItem.title}
          </HoverLink>
        </Bullet>
      ))
    ) : (
      <Bullet>No items in collection</Bullet>
    )}
    {item.itemsInCollection > 3 && (
      <Bullet>
        <HoverLink href={item.slug}>
          <More>
            {item.itemsInCollection - 3} more <Arrow />
          </More>
        </HoverLink>
      </Bullet>
    )}
  </ConnectedBullets>
)

const ExternalLink = ({ item }) => {
  return (
    <ListItem>
      <UnstyledLink href={item.url}>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
      </UnstyledLink>
    </ListItem>
  )
}

const Series = ({ item }) => {
  return (
    <ListItem>
      <LinkItem href={item.slug}>
        <>
          <Title>{item.title}</Title>
          <Bullets item={item} />
        </>
      </LinkItem>
    </ListItem>
  )
}

const Individual = ({ item }) => {
  return (
    <ListItem>
      <LinkItem href={item.slug}>
        <>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
        </>
      </LinkItem>
    </ListItem>
  )
}

const Item = ({ item }) => {
  const isIndividual = item.category === 'Article' || item.category === 'Video'
  const isSeries = item.category === 'Series'
  const isLink =
    item.category === 'Article Link' ||
    item.category === 'Video Link' ||
    item.category === 'Video Course Link'

  if (isIndividual) {
    return <Individual item={item} />
  }

  if (isSeries) {
    return <Series item={item} />
  }

  if (isLink) {
    return <ExternalLink item={item} />
  }

  return <p>something is wrong...</p>
}

const MultiList = ({ className, content }) => (
  <Root className={className}>
    {content.map((item) => (
      <Item key={item.title} item={item} />
    ))}
  </Root>
)

export default MultiList
