import renderer from 'react-test-renderer'
import CreateSeasonModal from './'

describe('CreateSeasonModal', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CreateSeasonModal />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
