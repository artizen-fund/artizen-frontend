import renderer from 'react-test-renderer'
import GrantsNavigator from './'

describe('GrantsNavigator', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<GrantsNavigator />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
