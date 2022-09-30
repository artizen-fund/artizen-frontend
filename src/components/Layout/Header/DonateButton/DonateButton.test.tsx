import renderer from 'react-test-renderer'
import DonateButton from './'

describe('DonateButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DonateButton />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
