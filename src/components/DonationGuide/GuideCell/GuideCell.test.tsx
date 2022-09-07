import renderer from 'react-test-renderer'
import GuideCell from './'

describe('GuideCell', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<GuideCell />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
