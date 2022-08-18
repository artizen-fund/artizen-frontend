import renderer from 'react-test-renderer'
import ProfileCard from './'

describe('ProfileCard', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProfileCard />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
