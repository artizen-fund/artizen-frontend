import renderer from 'react-test-renderer'
import AmountWidget from './'

describe('AmountWidget', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AmountWidget />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
