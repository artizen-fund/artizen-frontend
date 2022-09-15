import renderer from 'react-test-renderer'
import Onionskin from './'

describe('Onionskin', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Onionskin />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
