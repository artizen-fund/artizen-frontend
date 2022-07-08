import renderer from 'react-test-renderer'
import AlternatingPanels from './'

describe('AlternatingPanels', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AlternatingPanels />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
