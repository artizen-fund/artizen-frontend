import renderer from 'react-test-renderer'
import Curators from './'

describe('Curators', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Curators />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
