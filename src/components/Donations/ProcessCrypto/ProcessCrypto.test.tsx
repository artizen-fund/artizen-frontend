import renderer from 'react-test-renderer'
import ProcessCrypto from './'

describe('ProcessCrypto', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProcessCrypto />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
