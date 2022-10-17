import renderer from 'react-test-renderer'
import DonationSummary from './'

describe('DonationSummary', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DonationSummary />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
