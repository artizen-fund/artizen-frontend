import renderer from 'react-test-renderer'
import AccountStats from './'

describe('AccountStats', () => {
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
  it('renders correctly', () => {
    const tree = renderer.create(<AccountStats stats={mockedStats} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
