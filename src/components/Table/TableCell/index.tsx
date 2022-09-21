import styled from 'styled-components'
import { breakpoint, palette, typography } from '@theme'
import { rgba } from '@lib'

const TableCell = styled.div<{ highlight?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 40px;
  max-width: 100%;
  > * {
    margin: 4px 12px 4px 12px;
  }
  @media only screen and (min-width: ${breakpoint.laptop}px) {
    height: 48px;
    > * {
      margin: 4px 16px 4px 16px;
    }
  }
  @media only screen and (min-width: ${breakpoint.desktop}px) {
    height: 56px;
    > * {
      margin: 4px 24px 4px 24px;
    }
  }

  border-radius: 8px;
  ${props =>
    props.highlight &&
    `
      background-color: ${rgba(palette.stone, 0.24)};
      @media (prefers-color-scheme: dark) {
        background-color: ${rgba(palette.barracuda, 0.24)};
      }
    `}

  ${typography.label.l1}

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  > * {
    min-width: 0;
  }
`

export default TableCell
