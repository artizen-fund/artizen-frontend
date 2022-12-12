import renderer from 'react-test-renderer'
import TableAvatar from './'

describe('TableAvatar', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TableAvatar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
