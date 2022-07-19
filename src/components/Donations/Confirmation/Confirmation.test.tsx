import renderer from 'react-test-renderer'
import Confirmation from './'

describe('Confirmation', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Confirmation />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
