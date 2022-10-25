import renderer from 'react-test-renderer'
import Modals from './'

describe('Modals', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Modals />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
