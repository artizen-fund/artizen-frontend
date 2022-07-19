import renderer from 'react-test-renderer'
import DonationShelf from './'

describe('DonationShelf', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DonationShelf />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
