import renderer from 'react-test-renderer'
import CuratorCheck from './'

describe('CuratorCheck', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CuratorCheck />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
