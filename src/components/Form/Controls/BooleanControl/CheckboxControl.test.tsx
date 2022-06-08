import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import CheckboxControl from './CheckboxControl'
import { schema, uischema } from '@forms/sample'

describe('CheckboxControl', () => {
  const INPUT_PATH = '#/properties/booleanCheckExample'

  it('renders SelectControl unchanged', () => {
    const handleChange = () => console.log('derp')
    const { container } = render(
      <CheckboxControl
        data="vanilla"
        path={uischema.elements.find(e => e.scope === INPUT_PATH)?.scope || 'some-made-up-scope'}
        {...{ handleChange, schema, uischema }}
        label="Checkbox control test"
      />,
    )
    expect(container).toMatchSnapshot()
  })
})

/* 
Possible future tests…

- onchange triggers console log
*/
