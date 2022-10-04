import { useState } from 'react'
import renderer from 'react-test-renderer'
import { InvisiFileInput } from './'

describe('InvisiFileInput', () => {
  it('renders correctly', () => {
    const [file, setFile] = useState<File>()
    const tree = renderer.create(<InvisiFileInput {...{ setFile }} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
