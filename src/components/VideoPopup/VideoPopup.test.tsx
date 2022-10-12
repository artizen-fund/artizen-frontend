import renderer from 'react-test-renderer'
import VideoPopup from './'

describe('VideoPopup', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<VideoPopup />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
