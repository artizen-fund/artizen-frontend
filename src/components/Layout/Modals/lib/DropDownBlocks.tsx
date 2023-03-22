import { Maybe } from '@types'
import { rgba } from '@lib'
import { palette, typography } from '@theme'
import styled from 'styled-components'

interface IDropDownBlocks<T> {
  itemSelected: T | null
  setItemSelected: (item: T | null) => void
  items: Array<T>
  structure: {
    renderer: (item: T) => JSX.Element | string
    classNames?: string
  }[]
  align?: 'left' | 'right'
}

export const DropDownBlocks = <ObjectType extends { id?: string }>(props: IDropDownBlocks<ObjectType>) => {
  const { itemSelected, setItemSelected, items, structure, align } = props

  return (
    <>
      {items.map(item => {
        const isSelected = itemSelected?.id === item.id
        console.log(itemSelected?.id !== item.id)

        if (itemSelected?.id && itemSelected?.id !== item.id) {
          return null
        }

        return (
          <ItemWrapper
            align={align}
            id={item.id}
            key={item.id}
            onClick={() => setItemSelected(!isSelected ? item : null)}
          >
            {structure.map((itemStructure, index) => {
              const classNames = isSelected ? `${itemStructure.classNames} selected` : itemStructure.classNames

              return (
                <Item className={classNames} key={`${index}-structure`}>
                  {itemStructure.renderer(item)}
                </Item>
              )
            })}
          </ItemWrapper>
        )
      })}
    </>
  )
}

const ItemWrapper = styled.div<{ align?: Maybe<string> }>`
  align-items: center;
  height: 100px;
  display: grid;
  padding: 1rem;
  background-color: ${rgba(palette.stone, 0.44)};
  margin: 0.1rem 0;
  grid-auto-rows: 1fr;
  border-radius: 8px;
  grid-template-columns: ${props => (props.align === 'left' ? '74px 1fr' : '1fr 74px')};
  cursor: pointer;
  .selected {
    color: ${rgba(palette.algae, 1)};
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.white, 0.1)};
  }

  .doubleHeight {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    font-size: 1.5rem;
    text-align: right;
  }
`

const Item = styled.div`
  span {
    font-size: 0.2rem;
  }
`
