import renderer from 'react-test-renderer'
import TabbedContent from './'

describe('TabbedContent', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TabbedContent />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
