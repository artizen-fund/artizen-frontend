import renderer from 'react-test-renderer'
import Share from './'

describe('Share', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Share />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
