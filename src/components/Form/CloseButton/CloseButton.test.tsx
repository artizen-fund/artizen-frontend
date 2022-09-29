import renderer from 'react-test-renderer'
import CloseButton from './'

describe('CloseButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CloseButton />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
