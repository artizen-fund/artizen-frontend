import styled from 'styled-components'
import TableHeader from './TableHeader'
import TableCell from './TableCell'
import TableAvatar from './TableAvatar'

export interface TableProps {
  title: string
  sideItem?: React.ReactNode
  children?: React.ReactNode
  ancillary?: React.ReactNode
}

const Table = ({ title, sideItem, children, ...props }: TableProps) => {
  return (
    <Wrapper {...props}>
      <TableHeader {...{ title, sideItem }} />
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`

export { Table, TableCell, TableHeader, TableAvatar }
