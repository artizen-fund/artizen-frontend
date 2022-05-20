import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, TableHeader } from '@components'
import { breakpoint, palette, iconKey } from '@theme'
import { rgba } from '@lib'

export interface TableProps {
  title: string
  children?: React.ReactNode
  ancillary?: React.ReactNode
}

const Table = ({ title, children, ...props }: TableProps) => {
  return (
    <Wrapper {...props}>
      <TableHeader>{title}</TableHeader>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export default Table
