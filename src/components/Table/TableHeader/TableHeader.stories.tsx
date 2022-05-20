import TableHeader, { TableHeaderProps, Label } from './'
import { Button } from '@components'

export default {
  title: 'tables/TableHeader',
  component: TableHeader,
  argTypes: {
    children: {
      defaultValue: 'sample table',
      control: { type: 'text' },
    },
    ancillaryText: {
      defaultValue: 'more',
      control: { type: 'text' },
    },
  },
}

interface TableHeaderPropsWithAncillary extends TableHeaderProps {
  ancillaryText?: string
}

export const TableHeaderComponent = (props: TableHeaderProps) => <TableHeader {...props} />

export const TableHeaderWithButton = ({ ancillaryText, ...props }: TableHeaderPropsWithAncillary) => {
  const ancillary = <Button href="/">{ancillaryText}</Button>
  return <TableHeader {...props} {...{ ancillary }} />
}

export const TableHeaderWithSideLabel = ({ ancillaryText, ...props }: TableHeaderPropsWithAncillary) => {
  const ancillary = <Label>{ancillaryText}</Label>
  return <TableHeader {...props} {...{ ancillary }} />
}
