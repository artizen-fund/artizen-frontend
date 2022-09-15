import renderer from 'react-test-renderer'
import Breadcrumbs from './'

describe('Breadcrumbs', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Breadcrumbs />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
