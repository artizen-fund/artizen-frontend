import { template } from 'lodash'
import { useContext, useState } from 'react'
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
}

export const DropDownBlocks = <ObjectType extends { id?: string }>(props: IDropDownBlocks<ObjectType>) => {
  const { itemSelected, setItemSelected, items, structure } = props

  console.log(' itemsss  ', items)
  return (
    <>
      {items.map(item => {
        const isSelected = itemSelected?.id === item.id
        console.log(itemSelected?.id !== item.id)

        if (itemSelected?.id && itemSelected?.id !== item.id) {
          return null
        }

        console.log('goes here')

        return (
          <ItemWrapper id={item.id} key={item.id} onClick={() => setItemSelected(!isSelected ? item : null)}>
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

const ItemWrapper = styled.div`
  align-items: center;
  height: 100px;
  display: grid;
  padding: 1rem;
  background: ${rgba(palette.white, 0.1)};
  margin: 0.1rem 0;
  grid-auto-rows: 1fr;
  grid-template-columns: 74px 1fr;
  cursor: pointer;

  .selected {
    color: ${rgba(palette.algae, 1)};
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

const Wrapper = styled.div`
  background: ${rgba(palette.white)};
  @media (prefers-color-scheme: dark) {
    background: ${rgba(palette.slate)};
  }
  padding: 2rem;
  width: calc(100vw - 320px);
  height: calc(100vh - 320px);
`

const Headline = styled.h1`
  margin: 1rem 0;
  ${typography.title.l3}
`

const Message = styled.p`
  ${typography.body.l2}
`
