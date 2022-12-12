import renderer from 'react-test-renderer'
import CreateProfile from './'

describe('CreateProfile', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CreateProfile />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
