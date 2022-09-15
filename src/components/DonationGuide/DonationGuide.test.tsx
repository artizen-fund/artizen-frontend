import renderer from 'react-test-renderer'
import DonationGuide from './'

describe('DonationGuide', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DonationGuide />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
