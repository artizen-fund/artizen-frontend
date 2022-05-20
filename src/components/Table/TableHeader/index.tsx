import styled from 'styled-components'
import { Button } from '@components'
import { breakpoint, palette, iconKey } from '@theme'
import { rgba } from '@lib'

export interface TableHeaderProps {
  children: React.ReactNode
  ancillary?: React.ReactNode
}

const TableHeader = ({ children, ancillary }: TableHeaderProps) => (
  <Wrapper>
    <Label>{children}</Label>
    {ancillary}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Label = styled.div`
  font-size: 16px;
  line-height: 23px;
  color: ${palette.night};
`

export default TableHeader
