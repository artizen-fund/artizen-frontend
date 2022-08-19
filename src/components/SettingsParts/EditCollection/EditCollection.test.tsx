import renderer from 'react-test-renderer'
import EditCollection from './'

describe('EditCollection', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EditCollection />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
