import renderer from 'react-test-renderer'
import GuideCell from './'
import { donationGuideMap } from '@copy/home'

describe('GuideCell', () => {
  const sampleCell = donationGuideMap[0]

  it('renders correctly', () => {
    const tree = renderer.create(<GuideCell {...sampleCell} step={1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
