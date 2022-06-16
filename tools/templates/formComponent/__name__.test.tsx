import renderer from 'react-test-renderer'
import __name__ from './'

describe('__name__', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<__name__ />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
