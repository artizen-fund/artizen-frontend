import renderer from 'react-test-renderer'
import TileControl from './'

describe('TileControl', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TileControl />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
