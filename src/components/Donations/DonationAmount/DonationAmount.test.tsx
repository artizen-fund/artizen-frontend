import renderer from 'react-test-renderer'
import DonationAmount from './'

describe('DonationAmount', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DonationAmount />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
