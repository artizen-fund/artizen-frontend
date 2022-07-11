import renderer from 'react-test-renderer'
import AlternatingPanel from './'

describe('AlternatingPanel', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AlternatingPanel />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
