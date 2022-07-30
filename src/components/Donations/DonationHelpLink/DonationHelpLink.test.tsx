import renderer from 'react-test-renderer'
import DonationHelpLink from './'

describe('DonationHelpLink', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DonationHelpLink />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
