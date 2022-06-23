import renderer from 'react-test-renderer'
import SessionShelf from './'

describe('SessionShelf', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SessionShelf />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
