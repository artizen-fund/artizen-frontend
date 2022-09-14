import renderer from 'react-test-renderer'
import LottieAnimation from './'

describe('LottieAnimation', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LottieAnimation />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
