import { useState } from 'react'
import renderer from 'react-test-renderer'
import MediaModal from './'

describe('MediaModal', () => {
  it('renders correctly', () => {
    const src = './derp.mp4'
    const [visible, setVisible] = useState(false)
    const tree = renderer.create(<MediaModal {...{ src, visible, setVisible }} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
