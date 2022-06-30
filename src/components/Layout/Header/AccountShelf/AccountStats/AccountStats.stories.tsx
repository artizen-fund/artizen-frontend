import AccountStats from './'

export default {
  title: 'components/AccountStats',
  component: AccountStats,
  argTypes: {},
}

export const AccountStatsComponent = (props: any) => {
  const mockedStats = [
    {
      glyph: 'donate',
      unit: '$800',
      label: 'donated',
    },
    {
      glyph: 'info',
      unit: '42',
      label: 'collected',
    },
    {
      glyph: 'info',
      unit: '$0',
      label: 'collected',
    },
    {
      glyph: 'info',
      unit: '100',
      label: '$ART',
    },
  ]
  return <AccountStats {...props} stats={mockedStats} />
}
