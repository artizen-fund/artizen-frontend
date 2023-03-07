import { template } from 'lodash'
import { useContext, useState } from 'react'
import { rgba } from '@lib'
import { palette, typography } from '@theme'
import styled from 'styled-components'

export const DropDownBlocks = ({ items, structure, setItemSelected, itemSelected }) => {
  console.log('items', items)

  return (
    <>
      {items.map(item => {
        const isSelected = itemSelected?.id === item.id
        return (
          <ItemWrapper key={item.id} onClick={() => !isSelected && setItemSelected(item)}>
            {structure.map(itemStructure => {
              return itemStructure[isSelected ? 'selected' : 'notSelected'].map((itemData, index) => {
                return (
                  <Item className={`${isSelected ? 'selected' : ''}`} key={index}>
                    {itemData(item)}
                  </Item>
                )
              })
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
  background: ${rgba(palette.white, 0.2)};
  margin: 0.1rem 0;
  grid-auto-rows: 1fr;
  grid-template-columns: 2fr 1fr;

  .selected {
    color: ${rgba(palette.algae, 1)};
  }

  .doubleHeight {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
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
