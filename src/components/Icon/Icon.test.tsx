import renderer from 'react-test-renderer'
import Icon from './'

describe('Icon', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Icon>badge</Icon>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
