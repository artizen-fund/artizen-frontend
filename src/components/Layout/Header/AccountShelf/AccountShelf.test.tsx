import renderer from 'react-test-renderer'
import AccountShelf from './'

describe('AccountShelf', () => {
  const user: ArtizenUser = {
    id: 'abc123',
    email: 'herp@derp.com',
    issuer: 'Derp Donk',
    publicAddress: 'ICU81MI',
    phoneNumber: '555-555-1234',
  }
  it('renders correctly', () => {
    const tree = renderer.create(<AccountShelf {...{ user }} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
