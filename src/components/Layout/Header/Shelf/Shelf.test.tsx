import renderer from 'react-test-renderer'
import Shelf from './'

describe('Shelf', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Shelf />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
