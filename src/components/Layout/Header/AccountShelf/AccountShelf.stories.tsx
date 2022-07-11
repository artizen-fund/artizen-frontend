import AccountShelf from './'

export default {
  title: 'header/AccountShelf',
  component: AccountShelf,
  argTypes: {},
}

export const AccountShelfComponent = (props: any) => {
  const user = {
    firstName: 'Herp',
    lastName: 'Derp',
  }
  return <AccountShelf {...props} {...{ user }} />
}
