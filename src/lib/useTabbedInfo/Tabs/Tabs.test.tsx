import renderer from 'react-test-renderer'
import Tabs from './'

describe('Tabs', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Tabs />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
