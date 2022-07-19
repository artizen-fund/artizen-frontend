import renderer from 'react-test-renderer'
import PaymentFiat from './'

describe('PaymentFiat', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PaymentFiat />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
