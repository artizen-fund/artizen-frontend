import renderer from 'react-test-renderer'
import IconStack from './'

describe('IconStack', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<IconStack />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
