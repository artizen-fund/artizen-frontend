import renderer from 'react-test-renderer'
import EditWallet from './'

describe('EditWallet', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EditWallet />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
