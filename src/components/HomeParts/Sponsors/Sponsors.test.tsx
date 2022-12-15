import renderer from 'react-test-renderer'
import Sponsors from './'

describe('Sponsors', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Sponsors />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
