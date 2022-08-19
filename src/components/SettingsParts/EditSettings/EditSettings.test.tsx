import renderer from 'react-test-renderer'
import EditSettings from './'

describe('EditSettings', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EditSettings />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
