import renderer from 'react-test-renderer'
import Shimmer from './'

describe('Shimmer', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Shimmer />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
