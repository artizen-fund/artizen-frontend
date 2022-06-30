import renderer from 'react-test-renderer'
import DonateWcicle from './'

describe('DonateWcicle', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DonateWcicle />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
