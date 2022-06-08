import renderer from 'react-test-renderer'
import Slideshow from './'

describe('Slideshow', () => {
  const sampleSlides = ['/images/sample-art-1.jpg', '/images/sample-art-2.jpg', '/images/sample-art-3.jpg']
  it('renders correctly', () => {
    const tree = renderer.create(<Slideshow slides={sampleSlides} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
