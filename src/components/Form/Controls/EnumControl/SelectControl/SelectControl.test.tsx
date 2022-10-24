import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import SelectControl from './SelectControl'
import { schema, uischema } from '@forms/sample'

describe('SelectControl', () => {
  const INPUT_PATH = '#/properties/enumExample'

  it('renders SelectControl unchanged', () => {
    const handleChange = () => console.log('derp')
    const { container } = render(
      <SelectControl
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
