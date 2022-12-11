import renderer from 'react-test-renderer'
import FeaturedArtPanel from './'

describe('FeaturedArtPanel', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FeaturedArtPanel />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
