import renderer from 'react-test-renderer'
import Faq from './'

describe('Faq', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Faq />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
