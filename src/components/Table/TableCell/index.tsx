import styled from 'styled-components'
import { breakpoint, palette } from '@theme'
import { rgba } from '@lib'

export interface TableCellProps {
  children: React.ReactNode
}

const TableCell = styled.div<TableCellProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 40px;
  padding: 4px 12px 4px 12px;
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 48px;
    padding: 4px 16px 4px 16px;
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 56px;
    padding: 4px 24px 4px 24px;
  }

  border-radius: 8px;
  background-color: ${rgba(palette.stone, 0.24)};
  @media (prefers-color-scheme: dark) {
    background-color: ${rgba(palette.barracuda, 0.24)};
  }
`

export default TableCell
