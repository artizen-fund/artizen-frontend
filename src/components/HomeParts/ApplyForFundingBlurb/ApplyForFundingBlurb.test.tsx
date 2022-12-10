import renderer from 'react-test-renderer'
import ApplyForFundingBlurb from './'

describe('ApplyForFundingBlurb', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ApplyForFundingBlurb />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
