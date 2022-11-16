import renderer from 'react-test-renderer'
import PostDonationData from './'

describe('PostDonationData', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PostDonationData />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
