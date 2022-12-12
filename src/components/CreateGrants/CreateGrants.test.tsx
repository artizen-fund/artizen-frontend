import renderer from 'react-test-renderer'
import CreateGrants from '.'

describe('CreateGrants', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CreateGrants />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
