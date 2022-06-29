import renderer from 'react-test-renderer'
import LoginShelf from './'

describe('LoginShelf', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LoginShelf />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
