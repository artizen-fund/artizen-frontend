import renderer from 'react-test-renderer'
import ErrorMessage from './'

describe('ErrorMessage', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ErrorMessage />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
