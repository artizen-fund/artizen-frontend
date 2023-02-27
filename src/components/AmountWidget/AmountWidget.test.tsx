import renderer from 'react-test-renderer'
import AmountWidget from './'

describe('AmountWidget', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AmountWidget />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with props', () => {
    const tree = renderer
      .create(
        <AmountWidget
          amount={10}
          setAmount={() => {
            console.error('adding something to the empty function')
          }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
