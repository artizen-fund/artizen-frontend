import renderer from 'react-test-renderer'
import Glyph from './'

describe('Glyph', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Glyph>calendar</Glyph>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
