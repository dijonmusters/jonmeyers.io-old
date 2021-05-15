import styled from 'styled-components'
import { md } from 'utils/mediaQueries'
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

  ${md`
    font-size: 2rem;
  `};
`

const Description = styled.p`
  color: ${(props) => props.theme.muted2};
  font-size: 0.75rem;
  margin: 0;
  padding: 0.25rem 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${md`
    font-size: 1rem;
  `};
`

const LinkItem = styled(Link)`
  text-decoration: none;
  position: relative;
  font-size: 1.25rem;
  font-weight: 200;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  ${md`
    font-size: 1.5rem;
    padding: 1rem;
  `};

  &:hover {
    background-color: ${(props) => props.theme.hover};
  }
`

const ConnectedBullets = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Bullet = styled.li`
  position: relative;
  padding-left: 1.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.muted2};

  ${md`
    font-size: 1rem;
  `};

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
  z-index: 1;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.color};
  }
`

const Arrow = styled(IoIosArrowRoundForward)`
  font-size: 1.5rem;
`

const Bullets = ({ item, individualPath, collectionPath }) => (
  <ConnectedBullets>
    {item.collection.length > 0 ? (
      item.collection.map((individualItem) => (
        <Bullet key={individualItem.slug}>
          <HoverLink href={`${individualPath}/${individualItem.slug}`}>
            {individualItem.title}
          </HoverLink>
        </Bullet>
      ))
    ) : (
      <Bullet>No items in collection</Bullet>
    )}
    {item.itemsInCollection > 3 && (
      <Bullet>
        <HoverLink href={`${collectionPath}/${item.slug}`}>
          {item.itemsInCollection - 3} more <Arrow />
        </HoverLink>
      </Bullet>
    )}
  </ConnectedBullets>
)

const Item = ({ item, listPath, collectionPath, individualPath }) => {
  const isCollection = !!item.collection
  const path = isCollection
    ? `${collectionPath}/${item.slug}`
    : `${individualPath}/${item.slug}`

  return (
    <ListItem>
      <LinkItem href={path}>
        <>
          <Title>{item.title}</Title>
          {isCollection ? (
            <Bullets
              item={item}
              individualPath={individualPath}
              collectionPath={collectionPath}
            />
          ) : (
            <Description>{item.description}</Description>
          )}
        </>
      </LinkItem>
    </ListItem>
  )
}

const MultiList = ({
  children,
  className,
  collection,
  listPath,
  collectionPath,
  individualPath,
}) => (
  <Root className={className}>
    {collection.map((item) => (
      <Item
        key={item.title}
        item={item}
        listPath={listPath}
        collectionPath={collectionPath}
        individualPath={individualPath}
      />
    ))}
  </Root>
)

export default MultiList
