import renderer from 'react-test-renderer'
import { AlertModal } from './'

describe('AlertModal', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AlertModal headline="herp derp" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
