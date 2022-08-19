import renderer from 'react-test-renderer'
import ProcessingSocialLoginShelf from './'

describe('ProcessingSocialLoginShelf', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProcessingSocialLoginShelf />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
