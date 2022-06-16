import renderer from 'react-test-renderer'
import Login from './'

describe('Login', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Login />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
