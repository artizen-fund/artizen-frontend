import renderer from 'react-test-renderer'
import Slideshow from './'

describe('Slideshow', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Slideshow />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
