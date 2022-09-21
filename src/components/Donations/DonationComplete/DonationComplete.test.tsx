import renderer from 'react-test-renderer'
import DonationComplete from './'

describe('DonationComplete', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DonationComplete />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
