import AccountButton, { AccountButtonProps } from './'
import { Badge } from '@components'

export default {
  title: 'components/AccountButton',
  component: AccountButton,
  argTypes: {
    num: {
      control: 'number',
    },
  },
}

export const AccountButtonComponent = (props: AccountButtonProps) => <AccountButton {...props} />

export const AccountButtonWithBadgeComponent = (props: AccountButtonProps & { num?: number }) => (
  <AccountButton {...props}>
    <Badge stroke>{props.num}</Badge>
  </AccountButton>
)
