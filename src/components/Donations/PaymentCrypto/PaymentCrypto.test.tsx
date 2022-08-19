import renderer from 'react-test-renderer'
import PaymentCrypto from './'

describe('PaymentCrypto', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PaymentCrypto />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
