import renderer from 'react-test-renderer'
import QfSquare from './'

describe('QfSquare', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<QfSquare />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
