import renderer from 'react-test-renderer'
import EditNotifications from './'

describe('EditNotifications', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EditNotifications />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
