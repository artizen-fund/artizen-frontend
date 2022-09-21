import renderer from 'react-test-renderer'
import Distraction from './'

describe('Distraction', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Distraction />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
