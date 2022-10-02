import renderer from 'react-test-renderer'
import SettingsHeader from './'

describe('SettingsHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SettingsHeader />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
