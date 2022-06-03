import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button } from '@components'
import TableHeader from './TableHeader'
import TableCell from './TableCell'
import { breakpoint, palette, glyphKey } from '@theme'
import { rgba } from '@lib'

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
`

export { Table, TableCell, TableHeader }
