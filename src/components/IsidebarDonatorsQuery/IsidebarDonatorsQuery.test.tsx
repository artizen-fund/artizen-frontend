import renderer from 'react-test-renderer'
import IsidebarDonatorsQuery from './'

describe('IsidebarDonatorsQuery', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<IsidebarDonatorsQuery />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
