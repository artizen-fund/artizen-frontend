import renderer from 'react-test-renderer'
import SettingsFormHeader from './'

describe('SettingsFormHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SettingsFormHeader />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
