import renderer from 'react-test-renderer'
import AvatarForm from './'

describe('AvatarForm', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AvatarForm />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
