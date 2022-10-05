import renderer from 'react-test-renderer'
import BannerUploadWidget from './'

describe('BannerUploadWidget', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BannerUploadWidget />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
