import styled from 'styled-components'
import { TableProps } from '../'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export type TableHeaderProps = Pick<TableProps, 'title' | 'sideItem'>

const TableHeader = ({ title, sideItem, ...props }: TableHeaderProps) => (
  <Wrapper {...props}>
    <Label>{title}</Label>
    {sideItem}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 12px;
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    padding-bottom: 16px;
  }
`

export const Label = styled.div`
  font-size: 16px;
  line-height: 23px;
  color: ${rgba(palette.night)};
  @media (prefers-color-scheme: dark) {
    color: ${rgba(palette.moon)};
  }
`

export default TableHeader
