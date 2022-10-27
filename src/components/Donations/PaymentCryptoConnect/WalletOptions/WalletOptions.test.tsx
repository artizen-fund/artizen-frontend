import renderer from 'react-test-renderer'
import WalletOptions from './'

describe('WalletOptions', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<WalletOptions />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
