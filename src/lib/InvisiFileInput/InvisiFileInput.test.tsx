import renderer from 'react-test-renderer'
import InvisiFileInput from './'

describe('InvisiFileInput', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<InvisiFileInput />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
