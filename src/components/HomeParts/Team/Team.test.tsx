import renderer from 'react-test-renderer'
import Team from './'

describe('Team', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Team />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
