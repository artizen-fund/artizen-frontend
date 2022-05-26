import TableHeader, { TableHeaderProps, Label } from './'
import { Button } from '@components'

export default {
  title: 'tables/TableHeader',
  component: TableHeader,
  argTypes: {},
}

export const TableHeaderComponent = (props: TableHeaderProps) => <TableHeader {...props} />

export const TableHeaderWithButton = (props: TableHeaderProps) => {
  const sideItem = <Button href="/">Button</Button>
  return <TableHeader {...props} {...{ sideItem }} />
}

export const TableHeaderWithSideLabel = (props: TableHeaderProps) => {
  const sideItem = <Label>Label</Label>
  return <TableHeader {...props} {...{ sideItem }} />
}
