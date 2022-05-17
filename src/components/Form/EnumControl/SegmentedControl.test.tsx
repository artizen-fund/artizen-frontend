import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import SegmentedControl from './SegmentedControl'
import { schema, uischema } from '@forms/sample'

describe('SegmentedControl', () => {
  const INPUT_PATH = '#/properties/enumSegmentsExample'

  it('renders SegmentedControl unchanged', () => {
    const handleChange = () => console.log('derp')
    const { container } = render(
      <SegmentedControl
        data="vanilla"
        path={uischema.elements.find(e => e.scope === INPUT_PATH)?.scope!}
        {...{ handleChange, schema, uischema }}
        label="Segmented enum control test"
      />,
    )
    expect(container).toMatchSnapshot()
  })
})

/* 
Possible future tests…

- onchange triggers console log
- error state is respected
*/
