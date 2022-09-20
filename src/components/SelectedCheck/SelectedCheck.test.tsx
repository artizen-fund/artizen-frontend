import renderer from 'react-test-renderer'
import SelectedCheck from './'

describe('SelectedCheck', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SelectedCheck />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
