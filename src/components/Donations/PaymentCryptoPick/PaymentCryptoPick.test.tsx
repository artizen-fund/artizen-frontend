import renderer from 'react-test-renderer'
import PaymentCryptoPick from './'

describe('PaymentCryptoPick', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PaymentCryptoPick />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
