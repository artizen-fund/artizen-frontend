import renderer from 'react-test-renderer'
import AvatarUploadWidget from './'

describe('AvatarUploadWidget', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AvatarUploadWidget />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
